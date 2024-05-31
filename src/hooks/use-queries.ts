import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import type { NamedAPIResourceList } from "pokenode-ts";
import type { z } from "zod";

import { extractOffsetFromUrl } from "@/lib/utils";
import type { searchSchema } from "@/schemas/search";

export const queryKeys = {
  getSearch: "get-search",
};

export function useSearchQuery(params: z.infer<typeof searchSchema>) {
  async function queryFn({
    pageParam,
  }: {
    pageParam: unknown;
  }) {
    const offset = typeof pageParam === "number" ? pageParam : 0;
    const { data } = await axios.get<NamedAPIResourceList>("/api/search", {
      params: {
        query: params.query,
        offset,
      },
    });
    return data;
  }

  return useInfiniteQuery({
    queryKey: [queryKeys.getSearch, params.query],
    queryFn,
    initialPageParam: 0,
    getPreviousPageParam: ({ previous }) => extractOffsetFromUrl(previous),
    getNextPageParam: ({ next }) => extractOffsetFromUrl(next),
  });
}
