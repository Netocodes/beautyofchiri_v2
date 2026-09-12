import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { FetchApi } from "@/app/utils/fetchInstance";
import { profileResponse } from "@/lib/types/profileType";

export function useGetProfile() {
    const queryClient = useQueryClient();
    const query = useQuery<profileResponse>({
        queryKey: ["user-profile"],
        queryFn: () => FetchApi<profileResponse>("/api/user"),
        staleTime: 1000 * 60 * 5,
        retry: false,
        throwOnError: false
    });
    const clearProfile = () => {
        // Clear user cache instantly on logout
        queryClient.setQueryData(["user-profile"], null);
        queryClient.invalidateQueries({ queryKey: ["user-profile"] });
    };
    return { ...query, clearProfile };
}

export const useLogout = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<{ message: string }, { errorMessage: string }, void>({
        mutationKey: ['logout'],
        mutationFn: () => FetchApi<{ message: string }>('/auth/logout'),
        onSuccess: () => {
            // Clear user cache instantly on logout
            queryClient.setQueryData(["user-profile"], null);
            queryClient.invalidateQueries({ queryKey: ["user-profile"] });
        }
    })
    return mutation
}