import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getFavoritesWithIds(pokemonIds: number[]) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null };
  }

  return supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .in("pokemon_id", pokemonIds)
    .throwOnError();
}
