import {
  type InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useQueryState } from "nuqs";
import type { NamedAPIResource, NamedAPIResourceList } from "pokenode-ts";
import { toast } from "sonner";

import { addFavoriteAction } from "@/@server/actions/add-favorite";
import {
  signInWithOtpAction,
  signOutAction,
  verifyOtpAction,
} from "@/@server/actions/auth";
import { removeFavoriteAction } from "@/@server/actions/remove-favorite";
import { createClient } from "@/lib/supabase/client";
import { extractIdFromUrl, normalizePokemonName } from "@/lib/utils";

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
  const queryClient = useQueryClient();
  const [search] = useQueryState("search");

  return useMutation({
    mutationKey: [mutationKeys.signOut],
    mutationFn: signOutAction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeys.getSearch, search],
      });
      toast.success("Signed out successfully");
    },
  });
}

export function useToggleFavoriteMutation() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const supabase = createClient();
  const [search] = useQueryState("search");

  async function mutationFn(pokemon: NamedAPIResource) {
    const id = extractIdFromUrl(pokemon.url);
    const name = normalizePokemonName(pokemon.name);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return router.push("/signin");
    }

    if (pokemon.isFavorite) {
      await removeFavoriteAction(id);
      toast.success(`${name} removed from favorites`);
      return;
    }

    await addFavoriteAction({ pokemonId: id, pokemonName: pokemon.name });
    toast.success(`${name} added to favorites`);
  }

  return useMutation({
    mutationKey: [mutationKeys.toggleFavorite],
    mutationFn,
    async onMutate(newResource) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      await queryClient.cancelQueries({
        queryKey: [queryKeys.getSearch, search],
      });

      const previousSearchResults = queryClient.getQueryData<
        InfiniteData<NamedAPIResourceList>
      >([queryKeys.getSearch, search]);

      queryClient.setQueryData<InfiniteData<NamedAPIResourceList>>(
        [queryKeys.getSearch, search],
        (oldData) => {
          if (!oldData) return oldData;

          const newPages = oldData.pages.map((page) => ({
            ...page,
            results: page.results.map((resource) =>
              resource.name === newResource.name
                ? { ...resource, isFavorite: !resource.isFavorite }
                : resource,
            ),
          }));

          return { ...oldData, pages: newPages };
        },
      );

      return { previousSearchResults };
    },
    onError(_, __, context) {
      if (!context) return;
      queryClient.setQueryData<InfiniteData<NamedAPIResourceList>>(
        [queryKeys.getSearch, search],
        context.previousSearchResults,
      );
    },
  });
}
