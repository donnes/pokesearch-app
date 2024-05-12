"use client";
import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { PokemonListItem } from "@/components/composed/pokemon-list-item";
import { Button } from "@/components/ui/button";
import { useGetFavoritesQuery } from "@/hooks/use-queries";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-y-4">
      <Image
        src="/not-found-pikachu.png"
        className="w-40 ml-10"
        width={430}
        height={463}
        alt="No favorites"
      />
      <p className="font-medium text-zinc-400">No favorites yet, add some!</p>

      <div className="mt-4">
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}

export default function FavoritesPage() {
  const { data } = useGetFavoritesQuery();

  return (
    <div>
      <div className="flex h-16 items-center justify-between">
        <Button variant="link" className="px-0" asChild>
          <Link href="/" className="flex items-center">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </Button>
      </div>

      {!data || data.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((pokemon) => (
            <PokemonListItem key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
}
