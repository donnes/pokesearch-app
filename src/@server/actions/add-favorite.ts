"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { AddFavoriteSchema } from "@/schemas/favorite";

export async function addFavoriteAction(
  data: z.infer<typeof AddFavoriteSchema>,
) {
  try {
    const { pokemonId, pokemonName } = await AddFavoriteSchema.parseAsync(data);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    await supabase
      .from("favorites")
      .upsert({
        pokemon_id: pokemonId,
        pokemon_name: pokemonName,
      })
      .eq("user_id", user.id)
      .throwOnError();

    revalidatePath("/favorites", "page");
    revalidatePath("/pokemon/[id]", "page");
  } catch (error) {
    redirect("/signin");
  }
}
