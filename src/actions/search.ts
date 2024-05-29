"use server";

import {
  BaseURL,
  type NamedAPIResource,
  type NamedAPIResourceList,
} from "pokenode-ts";
import type { z } from "zod";

import { createClient } from "@/lib/pokeapi/client";
import { redis } from "@/lib/upstash/redis";
import { searchSchema } from "@/schemas/search";

const pokeApi = createClient();

const REDIS_TABLE = "search-terms";

export async function searchAction(params: z.infer<typeof searchSchema>) {
  const { query, offset, limit } = searchSchema.parse(params);

  let response: NamedAPIResourceList = {
    count: 0,
    next: null,
    previous: null,
    results: [],
  };

  if (!query) {
    response = await pokeApi.listPokemons(offset, limit);
    return response;
  }

  const names: string[] = [];
  const rank = await redis.zrank(REDIS_TABLE, query);

  if (rank) {
    const members = await redis.zrange<string[]>(REDIS_TABLE, rank, rank + 150);

    for (const member of members) {
      if (!member.startsWith(query)) {
        break;
      }

      if (member.endsWith("*")) {
        names.push(member.substring(0, member.length - 1));
      }
    }
  }

  const pokemonsData: NamedAPIResource[] = [];

  for (const name of names) {
    const pokemonData = await pokeApi.getPokemonByName(name);
    pokemonsData.push({
      url: `${BaseURL}/pokemon/${pokemonData.id}/`,
      name: pokemonData.name,
    });
  }

  response.results = pokemonsData;
  response.count = pokemonsData.length;

  return response;
}
