import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../api/client/product.client";

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
