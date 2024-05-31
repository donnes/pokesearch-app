import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getIsFavorite(pokekemonId: number) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return false;
  }

  const { data: favorite } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .eq("pokemon_id", pokekemonId)
    .single();

  return !!favorite;
}
