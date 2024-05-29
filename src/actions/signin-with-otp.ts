"use server";

import type { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { SignInWithOtpSchema } from "@/schemas/auth";

export async function signInWithOtpAction(
  data: z.infer<typeof SignInWithOtpSchema>,
) {
  const supabase = createClient();
  const { email } = await SignInWithOtpSchema.parseAsync(data);
  await supabase.auth.signInWithOtp({
    email,
  });
}
