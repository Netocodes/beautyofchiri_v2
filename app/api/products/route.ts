// import { NextResponse } from "next/server";
// import type { Product, ProductVariants, ProductWithVariants } from "@/lib/types/productTypes";
// import { createClient } from "@/lib/supabase/client";
// import { errorResponse } from "../apiError";
// import redis from "@/lib/redis/redis";


// type SearchVariant = {
//     price_kobo: number;
//     size_label: string;
// };

// type SearchProduct = Product & {
//     variants?: SearchVariant[];
//     displayPrice?: number;
// };

// // GET /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=&pageSize=
// export async function GET(req: Request) {
//     try {
//         const supabase = await createClient();
//         const url = new URL(req.url);

//         const search = url.searchParams.get("search")?.trim() ?? "";
//         const category = url.searchParams.get("category")?.trim() ?? "";
//         const minPriceParam = url.searchParams.get("minPrice");
//         const maxPriceParam = url.searchParams.get("maxPrice");
//         const sort = url.searchParams.get("sort") ?? "new";

//         const pageParam = url.searchParams.get("page") ?? "1";
//         const pageSizeParam = url.searchParams.get("pageSize") ?? "12";

//         const safePage = Math.max(1, parseInt(pageParam, 10) || 1);
//         const rawPageSize = parseInt(pageSizeParam, 10);
//         const safePageSize = isNaN(rawPageSize) || rawPageSize < 1 || rawPageSize > 50 ? 12 : rawPageSize;

//         const rawMin = Number(minPriceParam);
//         const rawMax = Number(maxPriceParam);

//         const minPrice = !isNaN(rawMin) && rawMin > 0 ? rawMin : null;
//         const maxPrice = !isNaN(rawMax) && rawMax > 0 ? rawMax : null;

//         const from = (safePage - 1) * safePageSize;
//         const to = from + safePageSize - 1;

//         let data: SearchProduct[] = [];
//         let count = 0;

//         // -------------------------------------------------------------
//         // BRANCH 1: RPC Search Query
//         // -------------------------------------------------------------
//         if (search) {
//             const cleaned = search.replace(/\s+/g, " ");

//             const { data: searchData, error: searchError } = await supabase.rpc("search_products", {
//                 search: cleaned
//             });

//             if (searchError) {
//                 console.error("Supabase search_products RPC error:", searchError);
//                 return errorResponse(
//                     searchError.message || "Failed to search products.",
//                     500, // Return 500 for server/RPC issues, not 400!
//                     searchError.details
//                 );
//             }

//             let filtered: SearchProduct[] = (searchData as SearchProduct[]) || [];

//             // Filter by Category
//             if (category && category !== "all") {
//                 filtered = filtered.filter((p) => p.category === category);
//             }

//             // Compute display price safely (Fixes Math.min() = Infinity bug)
//             filtered = filtered.map((p) => {
//                 const prices = (p.variants ?? [])
//                     .map((v) => v.price_kobo)
//                     .filter((price): price is number => typeof price === "number" && !isNaN(price));

//                 const displayPrice = prices.length > 0
//                     ? Math.min(...prices)
//                     : (p.base_price ?? 0);

//                 return { ...p, displayPrice };
//             });

//             // Filter by Price
//             if (minPrice != null) {
//                 filtered = filtered.filter((p) => (p.displayPrice ?? 0) >= minPrice);
//             }

//             if (maxPrice != null) {
//                 filtered = filtered.filter((p) => (p.displayPrice ?? 0) <= maxPrice);
//             }

//             // Sort Results
//             if (sort === "price_asc") {
//                 filtered.sort((a, b) => (a.displayPrice ?? 0) - (b.displayPrice ?? 0));
//             } else if (sort === "price_desc") {
//                 filtered.sort((a, b) => (b.displayPrice ?? 0) - (a.displayPrice ?? 0));
//             }

//             count = filtered.length;
//             data = filtered.slice(from, to + 1);

//             // -------------------------------------------------------------
//             // BRANCH 2: Direct Supabase Database Query
//             // -------------------------------------------------------------
//         } else {
//             let query = supabase
//                 .from("products")
//                 .select(`*, variants:product_variants(*)`, { count: "exact" });

//             if (category && category !== "all") {
//                 query = query.eq("category", category);
//             }

//             if (minPrice != null) {
//                 query = query.gte("base_price", minPrice);
//             }

//             if (maxPrice != null) {
//                 query = query.lte("base_price", maxPrice);
//             }

//             switch (sort) {
//                 case "price_asc":
//                     query = query.order("base_price", { ascending: true });
//                     break;
//                 case "price_desc":
//                     query = query.order("base_price", { ascending: false });
//                     break;
//                 default:
//                     query = query.order("created_at", { ascending: false });
//                     break;
//             }

//             query = query.range(from, to);

//             const res = await query;

//             if (res.error) {
//                 console.error("Supabase products query error:", res.error);
//                 return errorResponse(res.error.message || "Database query failed.", 500);
//             }

//             data = (res.data as SearchProduct[]) || [];
//             count = res.count ?? 0;
//         }

//         const setCache = await redis.set('products', JSON.stringify(data), { ex: 60 * 5 });
//         const getCache = await redis.get('products');

//         console.log(setCache)
//         console.log(getCache)

//         // -------------------------------------------------------------
//         // Format Final Products Array
//         // -------------------------------------------------------------
//         const products: ProductWithVariants[] = data.map((p) => {
//             const hasNoVariant = !p.variants || p.variants.length === 0;

//             const prices = (p.variants ?? [])
//                 .map((v) => v.price_kobo)
//                 .filter((price): price is number => typeof price === "number" && !isNaN(price));

//             // Safe Math.min without Infinity
//             const calculatedBasePrice = prices.length > 0
//                 ? Math.min(...prices)
//                 : (p.base_price ?? 0);

//             return {
//                 ...p,
//                 hasNoVariant,
//                 base_price: hasNoVariant ? p.base_price : calculatedBasePrice,
//             } as ProductWithVariants;
//         });

//         return NextResponse.json(
//             {
//                 success: true,
//                 products,
//                 pagination: {
//                     page: safePage,
//                     pageSize: safePageSize,
//                     total: count,
//                     totalPages: count > 0 ? Math.ceil(count / safePageSize) : 0,
//                 },
//                 filters: {
//                     search: search || null,
//                     category: category || null,
//                     minPrice,
//                     maxPrice,
//                     sort,
//                     page: safePage,
//                 },
//             },
//             {
//                 status: 200,
//                 headers: {
//                     "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
//                 },
//             }
//         );

//     } catch (err) {
//         console.error("Error in GET /api/products:", err);
//         return NextResponse.json(
//             {
//                 success: false,
//                 error: "Internal Server Error",
//                 details: err instanceof Error ? err.message : String(err),
//             },
//             { status: 500 }
//         );
//     }
// }

import { NextResponse } from "next/server";
import type { Product, ProductWithVariants } from "@/lib/types/productTypes";
import { createClient } from "@/lib/supabase/client";
import { errorResponse } from "../apiError";

type SearchVariant = {
    price_kobo: number;
    size_label: string;
};

type SearchProduct = Product & {
    variants?: SearchVariant[];
    displayPrice?: number;
};

export async function GET(req: Request) {
    try {
        const supabase = await createClient();
        const url = new URL(req.url);

        const search = url.searchParams.get("search")?.trim() ?? "";
        const category = url.searchParams.get("category")?.trim() ?? "";
        const minPriceParam = url.searchParams.get("minPrice");
        const maxPriceParam = url.searchParams.get("maxPrice");
        const sort = url.searchParams.get("sort") ?? "new";

        const pageParam = url.searchParams.get("page") ?? "1";
        const pageSizeParam = url.searchParams.get("pageSize") ?? "12";

        const safePage = Math.max(1, parseInt(pageParam, 10) || 1);
        const rawPageSize = parseInt(pageSizeParam, 10);
        const safePageSize =
            isNaN(rawPageSize) || rawPageSize < 1 || rawPageSize > 50 ? 12 : rawPageSize;

        const rawMin = Number(minPriceParam);
        const rawMax = Number(maxPriceParam);

        const minPrice = !isNaN(rawMin) && rawMin > 0 ? rawMin : null;
        const maxPrice = !isNaN(rawMax) && rawMax > 0 ? rawMax : null;

        const from = (safePage - 1) * safePageSize;
        const to = from + safePageSize - 1;

        let data: SearchProduct[] = [];
        let count = 0;

        // -------------------------------------------------------------
        // BRANCH 1: Search Query (Passing filters/pagination to Postgres)
        // -------------------------------------------------------------
        if (search) {
            const cleaned = search.replace(/\s+/g, " ");

            const { data: searchData, error: searchError } = await supabase.rpc("search_products", {
                search: cleaned,
            });

            if (searchError) {
                console.error("Supabase search_products RPC error:", searchError);
                return errorResponse(searchError.message || "Failed to search products.", 500);
            }
            console.log(searchData)

            let filtered: SearchProduct[] = (searchData as SearchProduct[]) || [];

            // Category filter (RPC doesn't do this)
            if (category && category !== "all") {
                filtered = filtered.filter((p) => p.category === category);
            }

            // Compute display price for sorting/filtering
            filtered = filtered.map((p) => {
                const prices = (p.variants ?? [])
                    .map((v) => v.price_kobo)
                    .filter((price): price is number => typeof price === "number" && !isNaN(price));
                const displayPrice = prices.length > 0 ? Math.min(...prices) : (p.base_price ?? 0);
                return { ...p, displayPrice };
            });

            if (minPrice != null) {
                filtered = filtered.filter((p) => (p.displayPrice ?? 0) >= minPrice);
            }
            if (maxPrice != null) {
                filtered = filtered.filter((p) => (p.displayPrice ?? 0) <= maxPrice);
            }

            if (sort === "price_asc") {
                filtered.sort((a, b) => (a.displayPrice ?? 0) - (b.displayPrice ?? 0));
            } else if (sort === "price_desc") {
                filtered.sort((a, b) => (b.displayPrice ?? 0) - (a.displayPrice ?? 0));
            } else {
                filtered.sort(
                    (a, b) => new Date(b.created_at ?? 0).getTime() - new Date(a.created_at ?? 0).getTime()
                );
            }

            count = filtered.length;
            data = filtered.slice(from, to + 1); // pagination applied AFTER full filtering/sorting
        }
        // -------------------------------------------------------------
        // BRANCH 2: Direct Supabase Query (Native DB Pagination)
        // -------------------------------------------------------------
        else {
            let query = supabase
                .from("products")
                .select(`*, variants:product_variants(*)`, { count: "exact" });

            if (category && category !== "all") {
                query = query.eq("category", category);
            }

            if (minPrice != null) {
                query = query.gte("base_price", minPrice);
            }

            if (maxPrice != null) {
                query = query.lte("base_price", maxPrice);
            }

            switch (sort) {
                case "price_asc":
                    query = query.order("base_price", { ascending: true });
                    break;
                case "price_desc":
                    query = query.order("base_price", { ascending: false });
                    break;
                default:
                    query = query.order("created_at", { ascending: false });
                    break;
            }

            query = query.range(from, to);

            const res = await query;

            if (res.error) {
                console.error("Supabase products query error:", res.error);

                // Postgres/PostgREST error codes: https://postgrest.org/en/stable/references/errors.html
                if (res.error.code === "42703") { // undefined_column
                    return errorResponse("Query configuration error.", 500, res.error.message);
                }
                if (res.error.code === "PGRST116" || res.error.code === "PGRST202") { // not found / no function
                    return errorResponse("Resource not found.", 404, res.error.message);
                }

                return errorResponse(res.error.message || "Database query failed.", 500);
            }

            data = (res.data as SearchProduct[]) || [];
            count = res.count ?? 0;
        }

        // -------------------------------------------------------------
        // Format Final Output
        // -------------------------------------------------------------
        const products: ProductWithVariants[] = data.map((p) => {
            const hasNoVariant = !p.variants || p.variants.length === 0;

            const prices = (p.variants ?? [])
                .map((v) => v.price_kobo)
                .filter((price): price is number => typeof price === "number" && !isNaN(price));

            const calculatedBasePrice =
                prices.length > 0 ? Math.min(...prices) : (p.base_price ?? 0);

            return {
                ...p,
                hasNoVariant,
                base_price: hasNoVariant ? p.base_price : calculatedBasePrice,
            } as ProductWithVariants;
        });

        return NextResponse.json(
            {
                success: true,
                products,
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total: count,
                    totalPages: count > 0 ? Math.ceil(count / safePageSize) : 0,
                },
                filters: {
                    search: search || null,
                    category: category || null,
                    minPrice,
                    maxPrice,
                    sort,
                    page: safePage,
                },
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "s-maxage=60, stale-while-revalidate=300",
                },
            }
        );
    } catch (err) {
        console.error("Error in GET /api/products:", err);
        return NextResponse.json(
            {
                success: false,
                error: "Internal Server Error",
                details: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}