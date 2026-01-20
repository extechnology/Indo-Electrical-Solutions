import { useQuery } from "@tanstack/react-query";
import { searchAll } from "../services.ts/searchService";

export const useSearch = (q: string) => {
  return useQuery({
    queryKey: ["search", q],
    queryFn: () => searchAll(q),
    enabled: !!q && q.trim().length >= 2,
    staleTime: 20 * 1000,
  });
};
