"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function removeFavoriteAction(id: number) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    await supabase
      .from("favorites")
      .delete()
      .eq("user_id", user.id)
      .eq("pokemon_id", id)
      .throwOnError();

    revalidatePath("/favorites", "page");
    revalidatePath("/pokemon/[id]", "page");
  } catch (error) {
    redirect("/signin");
  }
}
