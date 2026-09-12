'use client'
import { FetchApi } from "@/app/utils/fetchInstance"
import { productDetailsResponse } from "@/lib/types/productTypes"
import { useQuery } from "@tanstack/react-query"

export const useGetProductDetails = (slug: string) => {
    const query = useQuery<productDetailsResponse>({
        queryKey: ["productDetails", slug],
        queryFn: () => FetchApi(`/api/product?slug=${slug}`),
        enabled: !!slug,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

    return query
}