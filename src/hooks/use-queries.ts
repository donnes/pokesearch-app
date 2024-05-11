import { env } from "@/env.mjs";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

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
    pageParam = 0,
  }: {
    pageParam: number;
  }): Promise<NamedAPIResourceList> {
    if (!search) {
      const { data } = await api.get<NamedAPIResourceList>(
        `/pokemon/?limit=12&offset=${pageParam}`
      );
      return data;
    }

    const { data } = await api.get<Pokemon>(`/pokemon/${search}`);
    return {
      count: 1,
      next: null,
      previous: null,
      results: [
        {
          name: data.name,
          url: `${env.NEXT_PUBLIC_API_URL}/pokemon/${data.id}`,
        },
      ],
    };
  }

  return useInfiniteQuery({
    queryKey: [queryKeys.getPokemons, search],
    queryFn,
    initialPageParam: 0,
    getPreviousPageParam: ({ previous }) => extractOffsetFromUrl(previous),
    getNextPageParam: ({ next }) => extractOffsetFromUrl(next),
  });
}
