import * as React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col max-w-3xl py-12 md:py-24 px-6 md:px-0 mx-auto">
      <React.Suspense>{children}</React.Suspense>
    </main>
  );
}
