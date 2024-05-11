"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";

import { PokemonListItem } from "@/components/composed/pokemon-list-item";
import { SearchBar } from "@/components/composed/search-bar";
import { Button } from "@/components/ui/button";

function SearchNotFound() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-y-4">
      <Image
        src="/not-found-pikachu.png"
        className="w-40 ml-10"
        width={430}
        height={463}
        alt="Pokémon name not found"
      />
      <p className="font-medium text-zinc-400">
        Pokémon name not found, check your spelling.
      </p>
    </div>
  );
}

export default function Home() {
  const [search] = useQueryState("search");

  console.log(search);

  return (
    <div>
      <div className="flex items-center justify-between">
        <Image src="/logo.png" width={204.8} height={63.8} alt="PokeSearch" />

        <Button variant="ghost">
          <Star className="w-5 h-5 mr-2 text-yellow-400 fill-yellow-400" />
          Favorites
        </Button>
      </div>

      <SearchBar />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <PokemonListItem />
        <PokemonListItem />
        <PokemonListItem />
      </div>
    </div>
  );
}
