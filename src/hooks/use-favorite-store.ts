import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { NamedAPIResource } from "@/schemas/shared";

interface FavoriteState {
  favorites: Array<NamedAPIResource>;
  saveFavorite: (resource: NamedAPIResource) => void;
  removeFavorite: (name: string) => void;
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favorites: [],
      saveFavorite(newPokemon) {
        const pokemon = get().favorites.find(
          (pokemon) => pokemon.name === newPokemon.name
        );

        if (pokemon) return;

        return set((state) => ({
          favorites: [newPokemon, ...state.favorites],
        }));
      },
      removeFavorite(name) {
        return set((state) => ({
          favorites: state.favorites.filter((pokemon) => pokemon.name !== name),
        }));
      },
    }),
    {
      name: "favorites-storage",
    }
  )
);
