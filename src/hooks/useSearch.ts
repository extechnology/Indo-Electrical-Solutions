import { useQuery } from "@tanstack/react-query";
import { searchAll } from "../services.ts/searchService";

export const useSearch = (q: string) => {
  const query = q?.trim() || "";

  return useQuery({
    queryKey: ["search", query],

    queryFn: async () => {
      if (query.length < 2) {
        // ✅ consistent empty response (prevents undefined issues)
        return {
          products: [],
          brands: [],
          categories: {
            main: [],
            sub: [],
            leaf: [],
          },
        };
      }

      const res = await searchAll(query);

      // ✅ safety fallback if service returns undefined/null
      return (
        res ?? {
          products: [],
          brands: [],
          categories: { main: [], sub: [], leaf: [] },
        }
      );
    },

    enabled: query.length >= 2,
    staleTime: 20 * 1000,

    // ✅ optional: helps debugging + prevents UI crashes
    retry: 0,
  });
};
