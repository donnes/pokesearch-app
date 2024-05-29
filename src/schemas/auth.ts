import { z } from "zod";

export const SignInWithOtpSchema = z.object({
  email: z.string().email().min(1).trim(),
});

export const VerifyOtpSchema = z.object({
  email: z.string().email().min(1).trim(),
  token: z.string().min(6).trim(),
});
