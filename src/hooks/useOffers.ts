import { useQuery } from "@tanstack/react-query";
import { getOffersAndSchemes } from "../api/client/product.client";

export const useOffers = () => {
  return useQuery({
    queryKey: ["offers"],
    queryFn: getOffersAndSchemes,
  });
};  