import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { DotPattern } from "@/components/patterns/dot-pattern";
import { Toaster } from "@/components/ui/sonner";

import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokeSearch | Next.js app",
  description:
    "PokeSearch is a web application that allows users to search for Pokemons and their related information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className="fixed [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
        />
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
