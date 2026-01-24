import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../api/client/product.client";

export const useBanners = () => {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
  });
};