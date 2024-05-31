import { Star } from "lucide-react";
import Link from "next/link";
import * as React from "react";

import { Logo } from "@/components/composed/logo";
import { SearchBar } from "@/components/composed/search-bar";
import { SearchResults } from "@/components/composed/search-results";
import { UserMenu } from "@/components/composed/user-menu";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div>
      <div className="flex h-16 items-center justify-between">
        <Logo className="w-44" />

        <div className="flex items-center gap-x-2">
          <Button variant="ghost" asChild>
            <Link href="/favorites">
              <Star className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
              Favorites
            </Link>
          </Button>

          <UserMenu />
        </div>
      </div>

      <SearchBar />

      <SearchResults />
    </div>
  );
}
