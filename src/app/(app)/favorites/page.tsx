import { ChevronLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { getFavorites } from "@/@server/queries/get-favorites";
import { PokemonListItem } from "@/components/composed/pokemon-list-item";
import { Button } from "@/components/ui/button";

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-y-4">
      <Image
        src="/not-found-pikachu.png"
        className="w-40 ml-10"
        width={430}
        height={463}
        alt="No favorites"
        priority
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

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function FavoritesPage() {
  const { data: favorites } = await getFavorites();

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

      <div className="pt-4">
        <h1 className="font-bold text-4xl leading-tight">Favorites</h1>

        {!favorites || !favorites.length ? (
          <EmptyState />
        ) : (
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favorites.map((favorite) => (
              <PokemonListItem
                key={favorite.id}
                pokemon={{
                  name: favorite.pokemon_name,
                  url: `/pokemon/${favorite.pokemon_id}/`,
                  isFavorite: true,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
