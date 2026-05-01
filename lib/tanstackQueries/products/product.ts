import { FetchApi } from "@/app/utils/fetchInstance"
import { ErrorResponse } from "@/lib/types/ErrorResponse";
import { Filters, ProductsResponse } from "@/lib/types/productTypes"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"


export const useProducts = (filters?: Filters) => {
    return useQuery<ProductsResponse, ErrorResponse>({
        queryKey: [
            "products",
            filters?.search,
            filters?.category,
            filters?.minPrice,
            filters?.maxPrice,
            filters?.sort,
        ],

        queryFn: () => {
            const params = new URLSearchParams();

            params.append("page", "1");
            params.append("pageSize", "12");

            if (filters?.search) params.append("search", filters.search);
            if (filters?.category) params.append("category", filters.category);
            if (filters?.minPrice != null) {
                params.append("minPrice", String(filters.minPrice));
            }
            if (filters?.maxPrice != null) {
                params.append("maxPrice", String(filters.maxPrice));
            }
            if (filters?.sort) params.append("sort", filters.sort);

            return FetchApi(`/api/products?${params.toString()}`);
        },

        enabled: filters?.search ? filters.search.length > 2 : true,

        placeholderData: (prev) => prev,
        staleTime: 1000 * 60 * 2,
    });
};