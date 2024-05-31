"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import {
  useSignInWithOtpMutation,
  useVerifyOtpMutation,
} from "@/hooks/use-mutations";
import { SignInWithOtpSchema } from "@/schemas/auth";

import { Loader2 } from "lucide-react";
import { Logo } from "./logo";

export function SignInForm() {
  const form = useForm<z.infer<typeof SignInWithOtpSchema>>({
    resolver: zodResolver(SignInWithOtpSchema),
    defaultValues: {
      email: "",
    },
  });

  const signInWithOtp = useSignInWithOtpMutation();
  const verifyOtp = useVerifyOtpMutation();

  function onSubmit(data: z.infer<typeof SignInWithOtpSchema>) {
    signInWithOtp.mutate(data);
  }

  function onComplete(token: string) {
    verifyOtp.mutate({ token, email: form.getValues("email") });
  }

  return (
    <div className="flex flex-col w-full">
      <h1 className="flex items-center text-3xl font-bold mb-8">
        Sign in to <Logo className="h-12" />
      </h1>

      {signInWithOtp.isSuccess ? (
        <div className="flex flex-col space-y-4 items-center">
          <InputOTP
            maxLength={6}
            onComplete={onComplete}
            disabled={verifyOtp.isPending}
            render={({ slots }) => (
              <InputOTPGroup>
                {slots.map((slot, index) => (
                  <InputOTPSlot
                    key={index.toString()}
                    {...slot}
                    className="w-[62px] h-[62px]"
                  />
                ))}
              </InputOTPGroup>
            )}
          />

          <button
            onClick={() => {
              form.reset();
              signInWithOtp.reset();
              verifyOtp.reset();
            }}
            type="button"
            className="text-sm"
          >
            Try again
          </button>
        </div>
      ) : (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        placeholder="Enter your email"
                        {...field}
                        className="h-12"
                        autoCapitalize="false"
                        autoCorrect="false"
                        spellCheck="false"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={signInWithOtp.isPending}>
                {signInWithOtp.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </form>
        </Form>
      )}

      <Separator className="my-8" />

      <p className="text-xs text-zinc-500">
        By clicking continue, you acknowledge that you have read and agree to
        PokeSearch's{" "}
        <Link href="/" className="text-zinc-200 underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/" className="text-zinc-200 underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
