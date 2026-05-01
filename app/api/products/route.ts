// import { createClient } from "@supabase/supabase-js";
// import { NextResponse } from "next/server";
// import { errorResponse } from "../apiError";
// import { Product } from "@/lib/productTypes";

// const supabase = createClient(process.env.NEXT_PUBLIC_DATABASE_URL!, process.env.NEXT_PUBLIC_ANON_KEY!);

// export const GET = async (req: Request) => {
//     try {
//         const url = new URL(req.url);
//         const category = url.searchParams.get('category');
//         const tag = url.searchParams.get('tag');
//         const search = url.searchParams.get('search');

//         let query = supabase.from('products').select('*');

//         if (category) {
//             query = query.eq('category', category);
//         }
//         if (tag) {
//             query = query.contains('tags', [tag]);
//         }
//         if (search) {
//             query = query.ilike('name', `%${search}%`);
//         }

//         const { data, error } = await query;

//         if (error) {
//             throw error;
//         }
//         console.log('Fetched products:', data);

//         return NextResponse.json(data);
//     } catch (error) {
//         return errorResponse(`Failed to fetch products: ${error}`, 500);
//     }
// }



import { NextResponse } from "next/server";
import type { Product, ProductVariants, ProductWithVariants } from "@/lib/types/productTypes";
import { createClient } from "@/lib/supabase/server";
import { errorResponse } from "../apiError";
// import { errorResponse } from "../apiError"; // if you want to use your helper

type SearchVariant = {
    price_kobo: number;
    size_label: string;
};

type SearchProduct = Product & {
    variants: SearchVariant[];
    displayPrice: number;
};

// GET /api/products?search=&category=&minPrice=&maxPrice=&sort=&page=&pageSize=
export async function GET(req: Request) {
    const supabase = await createClient()
    try {
        const url = new URL(req.url);

        const search = url.searchParams.get("search") ?? "";
        const category = url.searchParams.get("category") ?? "";
        const minPriceParam = url.searchParams.get("minPrice");
        const maxPriceParam = url.searchParams.get("maxPrice");
        const sort = url.searchParams.get("sort") ?? "new"; // "new" | "price_asc" | "price_desc"

        const pageParam = url.searchParams.get("page") ?? "1";
        const pageSizeParam = url.searchParams.get("pageSize") ?? "10";

        const page = Number(pageParam);
        const pageSize = Number(pageSizeParam);
        let minPrice: number | null = null;
        let maxPrice: number | null = null;

        const rawMin = Number(minPriceParam);
        const rawMax = Number(maxPriceParam);

        if (!Number.isNaN(rawMin) && rawMin > 0) {
            minPrice = rawMin;
        }

        if (!Number.isNaN(rawMax) && rawMax > 0) {
            maxPrice = rawMax;
        }
        const safePage = Math.max(1, Number(page) || 1);
        const safePageSize =
            Number.isNaN(pageSize) || pageSize < 1 || pageSize > 50 ? 12 : pageSize;

        const from = (safePage - 1) * safePageSize;
        const to = from + safePageSize - 1;
        let data;  // will hold the final products data to return
        let count: number;  // will hold the total count of products for pagination
        let serverError; // will hold any server error that occurs during the query

        if (search) {
            const cleaned = search.trim().replace(/\s+/g, " ");

            const { data: searchData, error: searchError } = await supabase.rpc("search_products", { search: cleaned });

            // if the search RPC returns an error, we log it and return a formatted error response
            if (searchError) {
                console.error("Supabase search_products RPC error:", searchError);
                serverError = searchError.message || "An error occurred while searching for products.";
                return errorResponse(
                    serverError,
                    400,
                    searchError.details || "An error occurred while searching for products."
                );
            }

            console.log(searchData)

            // this 
            let filtered = searchData as SearchProduct[]

            // ✅ category
            if (category) {
                filtered = filtered.filter((p) => p.category === category);
            }

            // ✅ compute displayPrice BEFORE anything else
            filtered = filtered.map((p) => {
                // const prices = p.variants?.map(v => v.price_kobo) ?? [];

                // Filter out undefined values before Math.min()
                const prices = p.variants?.map(v => v.price_kobo).filter((price): price is number => price !== undefined) ?? [];

                const displayPrice = prices.length
                    ? Math.min(...prices)
                    : (p.base_price ?? 0);
                return {
                    ...p,
                    displayPrice,
                };
            }); console.log(filtered)
            console.log({
                minPrice,
                maxPrice,
                prices: filtered.map(p => p.displayPrice)
            });
            // ✅ FIX: use filtered (NOT data)
            if (minPrice != null) {
                filtered = filtered.filter((p) => p.displayPrice >= minPrice);
            }

            if (maxPrice != null) {
                filtered = filtered.filter((p) => p.displayPrice <= maxPrice);
            }

            // 🔥 sorting (now works because displayPrice exists)
            switch (sort) {
                case "price_asc":
                    filtered.sort((a, b) => a.displayPrice - b.displayPrice);
                    break;

                case "price_desc":
                    filtered.sort((a, b) => b.displayPrice - a.displayPrice);
                    break;

                default:
                    break;
            }
            console.log(filtered)

            count = filtered.length;

            // 🔥 pagination
            data = filtered.slice(from, to + 1);
            console.log(filtered)
        } else {
            let query = supabase
                .from("products")
                .select(`*, variants:product_variants(*)`, { count: "exact" });

            if (category) {
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
                serverError = res.error.message || "An error occurred while fetching products.";
                return errorResponse(serverError, 400);
            }
            console.log(res)

            data = res.data;
            count = res.count ?? 0;

        }






        console.log(data)

        const products: ProductWithVariants[] = data?.map((p) => {
            const hasNoVariant = !p.variants || p.variants.length === 0;

            const prices =
                p.variants?.map((v: ProductVariants) => v.price_kobo) ?? [];

            return {
                ...p,
                hasNoVariant,
                base_price: hasNoVariant
                    ? p.base_price
                    : Math.min(...prices),
            };
        }) ?? [];
        console.log(products)

        return NextResponse.json(
            {
                success: true,
                products: products as ProductWithVariants[],
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total: count ?? 0,
                    totalPages: count ? Math.ceil(count / safePageSize) : 0,
                },
                filters: {
                    search: search || null,
                    category: category || null,
                    minPrice,
                    maxPrice,
                    sort,
                    page
                },
            },
            {
                status: 200,
                headers: {
                    "Cache-Control": "s-maxage=60, stale-while-revalidate=300", // Cache for 1 minute, allow stale data for 5 minutes while revalidating
                },
            }
        );
    } catch (err) {
        console.error("Error in GET /api/products:", err);
        return NextResponse.json(
            {
                error: "Internal Server Error",
                details: err instanceof Error ? err.message : String(err),
            },
            { status: 500 }
        );
    }
}