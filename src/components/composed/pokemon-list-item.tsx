import { Star, StarIcon, StarOffIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { useToggleFavoriteMutation } from "@/hooks/use-mutations";
import { useGetFavoriteQuery } from "@/hooks/use-queries";
import { cn, extractIdFromUrl, renderId } from "@/lib/utils";
import type { NamedAPIResource } from "@/schemas/shared";

function FavoriteButton({ pokemon }: { pokemon: NamedAPIResource }) {
  const { data: favorite } = useGetFavoriteQuery(pokemon.name);
  const { mutate } = useToggleFavoriteMutation();

  const onClick = React.useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      e.preventDefault();
      mutate(pokemon);
    },
    [pokemon, mutate],
  );

  return (
    <Button
      variant="secondary"
      size="icon"
      className={cn("group/favorite absolute right-2 top-2 rounded-lg", {
        "text-yellow-400": !!favorite,
      })}
      onClick={onClick}
    >
      <StarIcon
        className={cn("w-5 h-5", {
          "fill-yellow-400 group-hover/favorite:hidden": !!favorite,
        })}
      />
      <StarOffIcon
        className={cn("hidden w-5 h-5 fill-yellow-400", {
          "group-hover/favorite:inline-flex": !!favorite,
        })}
      />
    </Button>
  );
}

export function PokemonListItem({ pokemon }: { pokemon: NamedAPIResource }) {
  const id = extractIdFromUrl(pokemon.url);

  return (
    <Link
      href={`/pokemon/${id}`}
      className="rounded-xl group hover:shadow-xl transition duration-200 shadow-input p-4 bg-zinc-950/50 border-zinc-800 border justify-between flex flex-col space-y-4"
    >
      <div className="relative flex flex-1 w-full h-full min-h-40 rounded-lg border border-white/[0.2] bg-white">
        <Image
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`}
          width={200}
          height={200}
          quality={60}
          alt={pokemon.name}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAoMBgDTD2qgAAAAASUVORK5CYII="
          className="object-cover w-full h-full"
        />

        <FavoriteButton pokemon={pokemon} />
      </div>
      <div className="group-hover:translate-x-2 transition duration-200">
        <span className="text-xs text-zinc-500">{renderId(id)}</span>
        <h2 className="font-sans font-bold text-zinc-200 capitalize">
          {pokemon.name}
        </h2>
      </div>
    </Link>
  );
}
