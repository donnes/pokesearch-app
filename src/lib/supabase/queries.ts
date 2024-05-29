import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "@/types/db";

type Client = SupabaseClient<Database>;

export async function getUserQuery(supabase: Client, userId: string) {
  return supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single()
    .throwOnError();
}

export async function getFavoritesQuery(supabase: Client, userId: string) {
  return supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .throwOnError();
}
