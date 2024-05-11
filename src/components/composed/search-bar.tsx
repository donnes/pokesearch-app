"use client";

import { Search, X } from "lucide-react";
import { useQueryState } from "nuqs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SearchBar() {
  const [query, setQuery] = useQueryState("search");

  return (
    <div className="relative mt-4">
      <Search className="absolute w-6 h-6 left-4 top-2/4 -translate-y-2/4 text-zinc-400" />
      <Input
        className="pr-14 pl-14"
        placeholder="Search"
        value={query || ""}
        onChange={(e) => setQuery(e.target.value)}
      />
      {query && (
        <Button
          type="button"
          className="absolute right-2 top-2/4 -translate-y-2/4"
          size="icon"
          variant="secondary"
          onClick={() => setQuery(null)}
        >
          <X className="w-6 h-6 text-zinc-400" />
        </Button>
      )}
    </div>
  );
}
