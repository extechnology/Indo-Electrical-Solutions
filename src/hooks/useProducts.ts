import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/client/product.client";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};