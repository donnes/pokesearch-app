import { env } from "@/env.mjs";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import type { NamedAPIResource, Pokemon } from "pokenode-ts";
import type { z } from "zod";

import { searchAction } from "@/actions/search";
import { extractOffsetFromUrl } from "@/lib/utils";
import type { searchSchema } from "@/schemas/search";

import { useFavoriteStore } from "./use-favorite-store";
export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_POKEAPI_BASE_URL,
  timeout: 10000,
});

export const queryKeys = {
  searcg: "search",
  getPokemons: "get-pokemons",
  getPokemon: "get-pokemon",
  getFavorites: "get-favorites",
  getFavorite: "get-favorite",
};

export function useSearchQuery(params: z.infer<typeof searchSchema>) {
  async function queryFn({
    pageParam,
  }: {
    pageParam: unknown;
  }) {
    const offset = typeof pageParam === "number" ? pageParam : 0;
    return searchAction({
      query: params.query,
      limit: params.limit ?? 24,
      offset,
    });
  }

  return useInfiniteQuery({
    queryKey: [queryKeys.getPokemons, params.query],
    queryFn,
    initialPageParam: 0,
    getPreviousPageParam: ({ previous }) => extractOffsetFromUrl(previous),
    getNextPageParam: ({ next }) => extractOffsetFromUrl(next),
  });
}

export function useGetPokemonQuery(id: string) {
  async function queryFn() {
    const { data } = await api.get<Pokemon>(`/pokemon/${id}/`);
    return data;
  }

  return useQuery<Pokemon, AxiosError>({
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

export function useGetFavoriteQuery(name: string) {
  const { favorites } = useFavoriteStore();

  return useQuery<NamedAPIResource | null>({
    queryKey: [queryKeys.getFavorite, name],
    queryFn: () => favorites.find((pokemon) => pokemon.name === name) || null,
    enabled: !!name,
  });
}
