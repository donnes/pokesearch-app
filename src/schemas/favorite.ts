import { z } from "zod";

export const AddFavoriteSchema = z.object({
  pokemonId: z.number().min(1, "Pokemon id is required"),
  pokemonName: z.string().min(1, "Pokemon name is required"),
});
