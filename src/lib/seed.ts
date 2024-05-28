import { redis } from "@/lib/upstash/redis";
import type { ScoreMember } from "@upstash/redis";
import { PokemonClient } from "pokenode-ts";

const pokeApi = new PokemonClient();

async function seedSearchTerms() {
  try {
    const pokemonsData = await pokeApi.listPokemons(0, 1500);
    const pokemonsName = pokemonsData.results.map((pokemon) => pokemon.name);
    const terms: ScoreMember<string>[] = [];

    for (const pokemonName of pokemonsName) {
      for (let i = 0; i < pokemonName.length; i++) {
        const member = pokemonName.substring(0, i);
        if (member.length > 0) {
          terms.push({ score: 0, member: pokemonName.substring(0, i) });
        }
      }
      terms.push({ score: 0, member: `${pokemonName}*` });
    }

    // @ts-expect-error
    await redis.zadd("search-terms", ...terms);

    console.log("Search terms seeded");
  } catch (error) {
    console.error(error);
  }
}

seedSearchTerms();
