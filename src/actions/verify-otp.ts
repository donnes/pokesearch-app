"use server";

import { redirect } from "next/navigation";
import type { z } from "zod";

import { createClient } from "@/lib/supabase/server";
import { VerifyOtpSchema } from "@/schemas/auth";

export async function verifyOtpAction(data: z.infer<typeof VerifyOtpSchema>) {
  const supabase = createClient();
  const { email, token } = await VerifyOtpSchema.parseAsync(data);
  await supabase.auth.verifyOtp({ email, token, type: "email" });
  redirect("/");
}
