import type { ReactNode } from "react";

import { DotPattern } from "@/components/patterns/dot-pattern";
import { cn } from "@/lib/utils";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <main className="flex min-h-screen flex-col max-w-3xl py-24 mx-auto">
      <DotPattern
        width={20}
        height={20}
        cx={1}
        cy={1}
        cr={1}
        className={cn(
          "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]",
        )}
      />
      {children}
    </main>
  );
}
