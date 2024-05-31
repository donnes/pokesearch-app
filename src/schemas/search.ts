import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().nullable(),
  limit: z.number().optional(),
  offset: z.number().optional(),
});
