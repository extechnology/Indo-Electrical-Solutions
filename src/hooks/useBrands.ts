import { useQuery } from "@tanstack/react-query";
import { getBrands } from "../api/client/product.client";

export const useBrands = () => {
  return useQuery({
    queryKey: ["brands"],
    queryFn: getBrands,
  });
};
