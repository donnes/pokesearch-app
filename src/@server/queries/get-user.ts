import "server-only";

import { createClient } from "@/lib/supabase/server";

export async function getUser() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { data: null };
  }

  return supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single()
    .throwOnError();
}
