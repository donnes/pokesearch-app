import Image from "next/image";

import { DotPattern } from "@/components/patterns/dot-pattern";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-4xl py-24 mx-auto">
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

      <div className="flex items-center justify-between">
        <Image src="/logo.png" width={204.8} height={63.8} alt="PokeSearch" />
      </div>

      <div className="relative mt-4">
        <Search className="absolute w-6 h-6 left-4 top-2/4 -translate-y-2/4 text-zinc-400" />
        <Input placeholder="Search" className="pr-24 pl-14" />
        <Button className="absolute right-2 top-2/4 -translate-y-2/4">
          Search
        </Button>
      </div>
    </main>
  );
}
