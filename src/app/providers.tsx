"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

type ProviderProps = {
  children: ReactNode;
};

export function Providers({ children }: ProviderProps) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
