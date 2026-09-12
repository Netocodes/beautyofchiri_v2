import { FetchApi } from "@/app/utils/fetchInstance";
import { ErrorResponse } from "@/lib/types/ErrorResponse";
import { Filters, ProductsResponse } from "@/lib/types/productTypes";
import { useQuery } from "@tanstack/react-query";

// useProducts.ts
export const useProducts = (filters?: Filters, page: number = 1, pageSize: number = 12) => {
    return useQuery<ProductsResponse, ErrorResponse>({
        queryKey: [
            "products",
            page, // 🔥 Still tracked in queryKey
            pageSize, // 🔥 Include pageSize in queryKey
            filters?.search,
            filters?.category,
            filters?.minPrice,
            filters?.maxPrice,
            filters?.sort,
        ],

        queryFn: () => {
            const params = new URLSearchParams();

            params.append("page", String(page)); // Uses the standalone page argument
            params.append("pageSize", String(pageSize)); // Uses the standalone pageSize arguments

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
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};