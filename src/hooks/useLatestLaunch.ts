import { useQuery } from "@tanstack/react-query";
import { getLatestLaunches } from "../api/client/product.client";

export const useLatestLaunch = () => {
    return useQuery({
        queryKey: ["latest-launches"],
        queryFn: () => getLatestLaunches(),
    });
};
