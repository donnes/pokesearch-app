import * as React from "react";

import { DotPattern } from "@/components/patterns/dot-pattern";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col max-w-3xl py-12 md:py-24 px-6 md:px-0 mx-auto">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "fixed [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      <React.Suspense>{children}</React.Suspense>
    </main>
  );
}
