import { FetchApi } from "@/app/utils/fetchInstance"
import { Filters, Product, ProductsResponse } from "@/lib/types/productTypes"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"



export const useInfiniteProducts = (filters: Filters) => {
    return useInfiniteQuery({
        queryKey: ["products", filters], // 🔥 important

        queryFn: ({ pageParam = 1 }) => {
            const params = new URLSearchParams();

            params.append("page", String(pageParam));

            if (filters.search) params.append("search", filters.search);
            if (filters.category) params.append("category", filters.category);
            if (filters.minPrice) params.append("minPrice", String(filters.minPrice));
            if (filters.maxPrice) params.append("maxPrice", String(filters.maxPrice));
            if (filters.sort) params.append("sort", filters.sort);

            return FetchApi(`/api/products?${params.toString()}`);
        },

        initialPageParam: 1,

        getNextPageParam: (lastPage: ProductsResponse) => {
            const current = lastPage.pagination.page;
            const total = lastPage.pagination.totalPages;

            return current < total ? current + 1 : undefined;
        },
    });
};