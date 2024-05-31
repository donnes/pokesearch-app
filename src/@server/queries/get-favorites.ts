import "server-only";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function getFavorites() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return supabase
    .from("favorites")
    .select("*")
    .eq("user_id", user.id)
    .throwOnError();
}
