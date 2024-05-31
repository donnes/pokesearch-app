import { type NextRequest, NextResponse } from "next/server";
import {
  BaseURL,
  type NamedAPIResource,
  type NamedAPIResourceList,
} from "pokenode-ts";

import { getFavoritesWithIds } from "@/@server/queries/get-favorites-with-ids";
import { pokeApi } from "@/lib/pokeapi/client";
import { createClient } from "@/lib/supabase/server";
import { redis } from "@/lib/upstash/redis";
import { extractIdFromUrl } from "@/lib/utils";

const REDIS_TABLE = "search-terms";

async function addIsFavoriteToResults(results: NamedAPIResource[]) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return results.map((result) => ({
      ...result,
      isFavorite: false,
    }));
  }

  const ids = results.map(({ url }) => extractIdFromUrl(url));
  const { data: favorites } = await getFavoritesWithIds(ids);

  if (!favorites || !favorites.length) {
    return results.map((result) => ({
      ...result,
      isFavorite: false,
    }));
  }

  return results.map((result) => {
    const favorite = favorites.find(
      ({ pokemon_name }) => pokemon_name === result.name,
    );
    return {
      ...result,
      isFavorite: !!favorite,
    };
  });
}

async function getRelatedPokemonNames(query: string) {
  const term = query.toLowerCase();
  const results: string[] = [];
  const rank = await redis.zrank(REDIS_TABLE, term);

  if (rank) {
    const members = await redis.zrange<string[]>(REDIS_TABLE, rank, rank + 150);

    for (const member of members) {
      if (!member.startsWith(term)) {
        break;
      }

      if (member.endsWith("*")) {
        results.push(member.substring(0, member.length - 1));
      }
    }
  }

  return results;
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get("query");
    const limit = Number.parseInt(searchParams.get("limit") || "12");
    const offset = Number.parseInt(searchParams.get("offset") || "0");

    let response: NamedAPIResourceList = {
      count: 0,
      next: null,
      previous: null,
      results: [],
    };

    if (!query) {
      response = await pokeApi.listPokemons(offset, limit);

      if (response.count > 0) {
        response.results = await addIsFavoriteToResults(response.results);
      }

      return NextResponse.json(response);
    }

    const pokemonNames = await getRelatedPokemonNames(query);

    let results: NamedAPIResource[] = [];

    for (const pokemonName of pokemonNames) {
      const pokemon = await pokeApi.getPokemonByName(pokemonName);
      results.push({
        url: `${BaseURL}/pokemon/${pokemon.id}/`,
        name: pokemon.name,
        isFavorite: false,
      });
    }

    results = await addIsFavoriteToResults(results);

    response.results = results;
    response.count = results.length;

    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
