import { useQuery } from "@tanstack/react-query";
import { FetchApi } from "@/app/utils/fetchInstance";
import { profile } from "@/lib/types/profileType";

export function useGetProfile() {
    return useQuery({
        queryKey: ["user-data"],
        queryFn: () => FetchApi<profile>("/api/user"),

    });
}