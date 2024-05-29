"use client";

import { useDebounce } from "@uidotdev/usehooks";
import Image from "next/image";
import { useQueryState } from "nuqs";
import * as React from "react";
import { useInView } from "react-intersection-observer";

import { useSearchQuery } from "@/hooks/use-queries";

import { PokeballLoading } from "./pokeball-loading";
import { PokemonListItem } from "./pokemon-list-item";

function SearchNotFoundState() {
  return (
    <div className="flex flex-col items-center justify-center mt-8 gap-y-4">
      <Image
        src="/not-found-pikachu.png"
        className="w-40 ml-10"
        width={430}
        height={463}
        alt="Pokémon not found"
      />
      <p className="font-medium text-zinc-400">
        No Pokémon found for the given search query.
      </p>
    </div>
  );
}

export function SearchResults() {
  const [search] = useQueryState("search");
  const debouncedSearch = useDebounce(search, 300);
  const { ref: endRef, inView: isEndReached } = useInView();

  const { data, isLoading, isFetchingNextPage, fetchNextPage } = useSearchQuery(
    { query: debouncedSearch },
  );

  React.useEffect(() => {
    if (isEndReached) {
      fetchNextPage();
    }
  }, [isEndReached, fetchNextPage]);

  if (data?.pages.length === 0 || data?.pages?.[0].count === 0) {
    return <SearchNotFoundState />;
  }

  return (
    <>
      {!isLoading && data && (
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
    </>
  );
}
