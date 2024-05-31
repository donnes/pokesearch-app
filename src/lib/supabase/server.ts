import { env } from "@/env.mjs";
import { type CookieOptions, createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";

import type { Database } from "@/types/db";

type CreateClientOptions = {
  schema?: "public" | "storage";
};

export const createClient = (options?: CreateClientOptions) => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      ...options,
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {}
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {}
        },
      },
      auth: {},
      global: {
        headers: {
          // Pass user agent from browser
          "user-agent": headers().get("user-agent") as string,
        },
      },
    },
  );
};
