import { ChevronLeft, RulerIcon, WeightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import * as React from "react";

import { getIsFavorite } from "@/@server/queries/get-is-favorite";
import { FavoriteButton } from "@/components/composed/favorite-button";
import { StatsIcon } from "@/components/composed/stats-icon";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress, type ProgressProps } from "@/components/ui/progress";
import { pokeApi } from "@/lib/pokeapi/client";
import { cn, normalizePokemonName } from "@/lib/utils";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const pokemon = await pokeApi.getPokemonById(Number.parseInt(params.id));
  const name = normalizePokemonName(pokemon.name);

  return {
    title: `${name} | PokeSearch`,
    description: `${name} is a Pokémon from the Pokémon franchise.`,
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PokemonPage({
  params,
}: { params: { id: string } }) {
  const pokemon = await pokeApi.getPokemonById(Number.parseInt(params.id, 10));

  if (!pokemon) {
    return notFound();
  }

  const isFavorite = await getIsFavorite(pokemon.id);

  return (
    <div>
      <div className="flex h-16 items-center justify-between">
        <Button variant="link" className="px-0" asChild>
          <Link href="/" className="flex items-center">
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back
          </Link>
        </Button>

        <FavoriteButton
          pokemon={{
            name: pokemon.name,
            url: `/pokemon/${pokemon.id}/`,
            isFavorite,
          }}
        />
      </div>

      <div className="pt-4 flex items-center">
        <h1 className="font-bold text-4xl leading-tight capitalize">
          {pokemon.name}
        </h1>

        <div className="flex items-center gap-x-2 pl-4">
          {pokemon.types.map((type) => (
            <Badge
              key={type.type.name}
              variant={type.type.name as keyof BadgeProps["variant"]}
            >
              {type.type.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 pt-10">
        <div>
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${params.id}.png`}
            width={200}
            height={200}
            quality={60}
            alt={pokemon.name}
            className="object-cover w-72 min-h-60"
            priority
          />
        </div>

        <div className="flex flex-col flex-1 gap-8">
          <div>
            <h2 className="text-2xl font-medium">Info</h2>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div>
                <h3 className="font-medium">
                  <WeightIcon className="mr-2 inline-block h-5 w-5" />
                  Weight
                </h3>
                <p className="text-sm text-gray-400 pt-2">
                  {pokemon.weight / 10} kg
                </p>
              </div>
              <div>
                <h3 className="font-medium">
                  <RulerIcon className="mr-2 inline-block h-5 w-5" />
                  Height
                </h3>
                <p className="text-sm text-gray-400 pt-2">
                  {pokemon.height / 10} m
                </p>
              </div>

              <div className="col-span-2 h-px bg-zinc-800 my-2" />

              {pokemon.stats
                .filter(({ stat }) => stat.name)
                .map(({ stat, base_stat }) => (
                  <div key={stat.name}>
                    <h3
                      className={cn("font-medium capitalize", {
                        uppercase: stat.name.length === 2,
                      })}
                    >
                      <StatsIcon stat={stat.name} />
                      {stat.name.replace(/-/g, " ")}
                    </h3>
                    <p className="text-sm text-gray-400 pt-2">{base_stat}</p>
                  </div>
                ))}
            </div>
          </div>

          {pokemon.abilities.length > 0 && (
            <div>
              <h2 className="text-2xl font-medium">Abilities</h2>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {pokemon.abilities
                  .filter(({ ability }) => ability.name)
                  .map(({ ability }) => (
                    <div
                      key={ability.name}
                      className="capitalize px-3 py-2 rounded-xl bg-zinc-800"
                    >
                      {ability.name.replace(/-/g, " ")}
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-2xl font-medium">Stats</h2>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {pokemon.stats
                .filter(({ stat }) => stat.name)
                .map(({ stat, base_stat }) => {
                  return (
                    <div key={stat.name}>
                      <h3
                        className={cn("capitalize text-sm text-zinc-400 pb-2", {
                          uppercase: stat.name.length === 2,
                        })}
                      >
                        <StatsIcon stat={stat.name} className="h-4 w-4" />
                        {stat.name.replace(/-/g, " ")}
                      </h3>

                      <Progress
                        value={(base_stat / 300) * 100}
                        variant={stat.name as keyof ProgressProps["variant"]}
                      />
                      <div className="flex justify-end pt-0.5 pr-2 text-xs text-zinc-400">
                        Max: {300}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
