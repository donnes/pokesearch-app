import { env } from "@/env.mjs";
import { type UseQueryOptions, useQuery } from "@tanstack/react-query";
import axios from "axios";

import type { Pokemon } from "@/schemas/pokemon";
import type { NamedAPIResourceList } from "@/schemas/shared";

export const api = axios.create({
  baseURL: env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

export const queryKeys = {
  getPokemons: "get-pokemons",
};

export function useGetPokemonsQuery(
  search: string | null,
  options?: UseQueryOptions<NamedAPIResourceList>
) {
  async function queryFn(): Promise<NamedAPIResourceList> {
    if (!search) {
      const { data } = await api.get<NamedAPIResourceList>(
        "/pokemon/?limit=12"
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

  return useQuery({
    queryKey: [queryKeys.getPokemons, search],
    queryFn,
    ...options,
  });
}
