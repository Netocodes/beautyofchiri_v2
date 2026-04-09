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
import type { ProductVariants, ProductWithVariants } from "@/lib/types/productTypes";
import { createClient } from "@/lib/supabase/server";
// import { errorResponse } from "../apiError"; // if you want to use your helper


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

        const minPrice = minPriceParam ? Number(minPriceParam) : null;
        const maxPrice = maxPriceParam ? Number(maxPriceParam) : null;

        const safePage = Math.max(1, Number(page) || 1);
        const safePageSize =
            Number.isNaN(pageSize) || pageSize < 1 || pageSize > 50 ? 12 : pageSize;

        const from = (safePage - 1) * safePageSize;
        const to = from + safePageSize - 1;

        // base query – product + its variants
        let query = supabase
            .from("products")
            .select(
                ` *,
        variants:product_variants(*)
      `,
                { count: "exact" }
            );

        // 🔎 search by product name
        if (search) {
            query = query.ilike("name", `%${search}%`);
        }

        // 🏷 category filter
        if (category) {
            query = query.eq("category", category);
        }

        // 💰 price filters 
        if (minPrice != null) {
            query = query.gte("price_kobo", minPrice);
        }
        if (maxPrice != null) {
            query = query.lte("price_kobo", maxPrice);
        }

        // 📌 sorting
        switch (sort) {
            case "price_asc": // from low to highest 0-> 1000
                query = query.order("base_price", { ascending: true, nullsFirst: false });
                break;
            case "price_desc": // from high to lowest 1000 -> 0
                query = query.order("base_price", { ascending: false, nullsFirst: false });
                break;
            case "new":
            default:
                query = query.order("created_at", { ascending: false });
                break;
        }

        // 📄 pagination
        query = query.range(from, to);

        const { data, error, count } = await query;

        if (error) {
            console.error("Supabase products query error:", error);
            return NextResponse.json(
                { error: "Failed to fetch products", details: error.message },
                { status: 400 }
            );
        }
        const products = data?.map((p) => {
            const hasNoVariant = !p.variants || p.variants.length === 0;

            return {
                ...p,
                hasNoVariant,
                displayPrice: hasNoVariant
                    ? p.base_price
                    : Math.min(...p.variants.map((v: ProductVariants) => v.price_kobo)), // Convert kobo to naira for display
            };
        }) ?? [];

        return NextResponse.json(
            {
                success: true,
                products: products as ProductWithVariants[],
                pagination: {
                    page: safePage,
                    pageSize: safePageSize,
                    total: count ?? 0,
                    totalPages: count ? Math.ceil(count / safePageSize) : 1,
                },
                filters: {
                    search: search || null,
                    category: category || null,
                    minPrice,
                    maxPrice,
                    sort,
                },
            },
            { status: 200 }
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