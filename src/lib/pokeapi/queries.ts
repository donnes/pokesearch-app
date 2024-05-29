import { createClient } from "./client";

const api = createClient();

export function getPokemon(id: number) {
  return api.getPokemonById(id);
}
