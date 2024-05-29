import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NamedAPIResource } from "pokenode-ts";
import * as React from "react";
import { toast } from "sonner";

import { signInWithOtpAction } from "@/actions/sign-in-with-otp";
import { verifyOtpAction } from "@/actions/verify-otp";

import { signOutAction } from "@/actions/sign-out";
import { useFavoriteStore } from "./use-favorite-store";
import { queryKeys } from "./use-queries";

export const mutationKeys = {
  signIn: "sign-in",
  verifyOtp: "verify-otp",
  signOut: "sign-out",
  toggleFavorite: "toggle-favorite",
};

export function useSignInWithOtpMutation() {
  return useMutation({
    mutationKey: [mutationKeys.signIn],
    mutationFn: signInWithOtpAction,
    onSuccess: () => {
      toast.success("Verification code sent to your email");
    },
  });
}

export function useVerifyOtpMutation() {
  return useMutation({
    mutationKey: [mutationKeys.verifyOtp],
    mutationFn: verifyOtpAction,
    onSuccess: () => {
      toast.success("Signed in successfully");
    },
  });
}

export function useSignOutMutation() {
  return useMutation({
    mutationKey: [mutationKeys.signOut],
    mutationFn: signOutAction,
    onSuccess: () => {
      toast.success("Signed out successfully");
    },
  });
}

export function useToggleFavoriteMutation() {
  const { favorites, saveFavorite, removeFavorite } = useFavoriteStore();
  const queryClient = useQueryClient();

  async function mutationFn(newPokemon: NamedAPIResource) {
    const pokemon = favorites.find(
      (pokemon) => pokemon.name === newPokemon.name,
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
