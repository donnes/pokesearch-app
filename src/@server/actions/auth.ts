"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import type { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { SignInWithOtpSchema, VerifyOtpSchema } from "@/schemas/auth";

export async function signInWithOtpAction(
  data: z.infer<typeof SignInWithOtpSchema>,
) {
  const supabase = createClient();
  const { email } = await SignInWithOtpSchema.parseAsync(data);
  await supabase.auth.signInWithOtp({
    email,
  });
}

export async function verifyOtpAction(data: z.infer<typeof VerifyOtpSchema>) {
  const supabase = createClient();
  const { email, token } = await VerifyOtpSchema.parseAsync(data);
  await supabase.auth.verifyOtp({ email, token, type: "email" });
  redirect("/");
}

export async function signOutAction() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.auth.signOut({
    scope: "local",
  });

  revalidateTag(`user_${user?.id}`);
}
