import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function Home() {
  return (
    <div>
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
    </div>
  );
}
