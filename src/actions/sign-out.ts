"use server";

import { revalidateTag } from "next/cache";

import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  await supabase.auth.signOut({
    scope: "local",
  });

  revalidateTag(`user_${session?.user.id}`);
}
