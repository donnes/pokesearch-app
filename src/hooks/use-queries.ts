import { env } from "@/env.mjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";

import { extractOffsetFromUrl } from "@/lib/utils";
import type { Pokemon } from "@/schemas/pokemon";
import type { NamedAPIResourceList } from "@/schemas/shared";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const queryKeys = {
  getPokemons: "get-pokemons",
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
