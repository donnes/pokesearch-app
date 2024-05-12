import { env } from "@/env.mjs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";

import { extractOffsetFromUrl } from "@/lib/utils";
import type { Pokemon } from "@/schemas/pokemon";
import type { NamedAPIResource, NamedAPIResourceList } from "@/schemas/shared";

import { useFavoriteStore } from "./use-favorite-store";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const queryKeys = {
  getPokemons: "get-pokemons",
  getPokemon: "get-pokemon",
  getFavorites: "get-favorites",
  getFavorite: "get-favorite",
};

export function useGetPokemonsQuery(search: string | null) {
  async function queryFn({
    pageParam,
  }: {
    pageParam: unknown;
  }): Promise<NamedAPIResourceList> {
    const offset = typeof pageParam === "number" ? pageParam : 0;

    if (!search) {
      const { data } = await api.get<NamedAPIResourceList>(
        `/pokemon/?limit=12&offset=${offset}`
      );
      return data;
    }

    const { data } = await api.get<Pokemon>(`/pokemon/${search.toLowerCase()}`);
    return {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: data.name,
          url: `${env.NEXT_PUBLIC_API_URL}/pokemon/${data.id}/`,
        },
      ],
    };
  }

  return useInfiniteQuery<NamedAPIResourceList, AxiosError>({
    queryKey: [queryKeys.getPokemons, search],
    queryFn,
    initialPageParam: 0,
    getPreviousPageParam: ({ previous }) => extractOffsetFromUrl(previous),
    getNextPageParam: ({ next }) => extractOffsetFromUrl(next),
    retry: false,
  });
}

export function useGetPokemonQuery(id: string) {
  async function queryFn() {
    const { data } = await api.get<Pokemon>(`/pokemon/${id}/`);
    return data;
  }

  return useQuery({
    queryKey: [queryKeys.getPokemon, id],
    queryFn,
  });
}

export function useGetFavoritesQuery() {
  const { favorites } = useFavoriteStore();

  return useQuery<Array<NamedAPIResource>>({
    queryKey: [queryKeys.getFavorites],
    queryFn: () => favorites,
  });
}

export function useGetFavoriteQuery(name?: string) {
  const { favorites } = useFavoriteStore();

  return useQuery<NamedAPIResource | undefined>({
    queryKey: [queryKeys.getFavorite, name],
    queryFn: () => favorites.find((pokemon) => pokemon.name === name),
    enabled: !!name,
  });
}
