import Image from "next/image";
import Link from "next/link";
import * as React from "react";

import { extractIdFromUrl, renderId } from "@/lib/utils";
import type { NamedAPIResource } from "@/schemas/shared";

import { FavoriteButton } from "./favorite-button";

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

        <div className="absolute right-2 top-2">
          <FavoriteButton
            size="icon"
            variant="secondary"
            pokemon={pokemon}
            showLabel={false}
          />
        </div>
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
