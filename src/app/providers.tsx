"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
