import { productDetailsResponse, ProductVariants } from "@/lib/types/productTypes";
import { NextResponse } from "next/server";
import { errorResponse } from "../apiError";
import { createClient } from "@/lib/supabase/client";

export const GET = async (req: Request) => {
    const supabase = await createClient()
    try {
        const url = new URL(req.url);
        const slug = url.searchParams.get('slug');

        if (!slug) {
            return errorResponse("Missing slug query parameter", 400);
        }

        const { data, error } = await supabase.from('products')
            .select(`*, variants:product_variants(*), details:product_details(*)`)
            .eq('slug', slug)
            .single();


        // 🟥 Supabase errors should NOT be 500
        if (error && error.code === 'PGRST116') { // PGRST116 = No rows returned
            console.log('fired')
            return errorResponse("Product not found", 404);
        } else if (error) {
            return errorResponse(`Database error: ${error.message}`, 400);
        }

        // 🟨 If no rows returned
        if (!data || data.length === 0) {
            return errorResponse("Product not found", 404);
        }
        console.log(data)

        return NextResponse.json({ success: true, data: data as productDetailsResponse[] }, { status: 200 });
    } catch (error) {
        console.error(error);
        return errorResponse(`Internal server error: ${error instanceof Error ? error.message : String(error)}`, 500);
    }
}