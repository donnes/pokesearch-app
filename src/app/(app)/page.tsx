"use client";

import { Star } from "lucide-react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { PokeballLoading } from "@/components/composed/pokeball-loading";
import { PokemonListItem } from "@/components/composed/pokemon-list-item";
import { SearchBar } from "@/components/composed/search-bar";
import { Button } from "@/components/ui/button";
import { useGetPokemonsQuery } from "@/hooks/use-queries";
import { useDebounce } from "@uidotdev/usehooks";

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

function SearchError() {
  return (
    <p className="text-zinc-400 py-8 text-center">
      An error occurred while fetching the data. Please try again later.
    </p>
  );
}

export default function Home() {
  const [search] = useQueryState("search");
  const debouncedSearch = useDebounce(search, 300);
  const { ref: endRef, inView: isEndReached } = useInView();

  const { data, error, isError, isLoading, isFetchingNextPage, fetchNextPage } =
    useGetPokemonsQuery(debouncedSearch);

  React.useEffect(() => {
    if (isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached, fetchNextPage]);

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

      {isError && error.response?.status === 404 ? (
        <SearchNotFound />
      ) : (
        isError && <SearchError />
      )}

      {!isLoading && !isError && data && (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.pages.map((page) => (
            <React.Fragment key={page.next}>
              {page.results.map((pokemon) => (
                <PokemonListItem key={pokemon.name} pokemon={pokemon} />
              ))}
            </React.Fragment>
          ))}
        </div>
      )}

      {(isLoading || isFetchingNextPage) && (
        <div className="flex items-center justify-center py-8">
          <PokeballLoading />
        </div>
      )}

      <div ref={endRef} />
    </div>
  );
}
