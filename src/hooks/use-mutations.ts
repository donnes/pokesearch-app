import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as React from "react";
import { toast } from "sonner";

import type { NamedAPIResource } from "@/schemas/shared";
import { useFavoriteStore } from "./use-favorite-store";
import { queryKeys } from "./use-queries";

export const mutationKeys = {
  toggleFavorite: "toggle-favorite",
};

export function useToggleFavoriteMutation() {
  const { favorites, saveFavorite, removeFavorite } = useFavoriteStore();
  const queryClient = useQueryClient();

  async function mutationFn(newPokemon: NamedAPIResource) {
    const pokemon = favorites.find(
      (pokemon) => pokemon.name === newPokemon.name
    );

    const name =
      newPokemon.name.charAt(0).toUpperCase() + newPokemon.name.slice(1);

    if (pokemon) {
      removeFavorite(newPokemon.name);
      toast.success(`${name} removed from favorites`);
      return;
    }

    saveFavorite(newPokemon);
    toast.success(`${name} added to favorites`);
  }

  const mutation = useMutation({
    mutationKey: [mutationKeys.toggleFavorite],
    mutationFn,
  });

  React.useEffect(() => {
    if (mutation.isSuccess) {
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getFavorites],
      });
      void queryClient.invalidateQueries({
        queryKey: [queryKeys.getFavorite, mutation.variables.name],
      });
    }
  }, [mutation, queryClient]);

  return mutation;
}
