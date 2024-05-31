"use client";

import { StarIcon, StarOffIcon } from "lucide-react";
import type { NamedAPIResource } from "pokenode-ts";
import * as React from "react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { useToggleFavoriteMutation } from "@/hooks/use-mutations";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps extends ButtonProps {
  pokemon: NamedAPIResource;
  showLabel?: boolean;
}

export function FavoriteButton({
  pokemon,
  showLabel = true,
  className,
  ...props
}: FavoriteButtonProps) {
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
      variant="ghost"
      className={cn(
        "group/favorite gap-x-2",
        {
          "text-yellow-400": pokemon.isFavorite,
        },
        className,
      )}
      onClick={onClick}
      {...props}
    >
      <StarIcon
        className={cn("w-5 h-5", {
          "fill-yellow-400 group-hover/favorite:hidden": pokemon.isFavorite,
        })}
      />
      <StarOffIcon
        className={cn("hidden w-5 h-5 fill-yellow-400", {
          "group-hover/favorite:inline-flex": pokemon.isFavorite,
        })}
      />
      {showLabel && "Favorite"}
    </Button>
  );
}
