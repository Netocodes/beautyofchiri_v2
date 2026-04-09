import { z } from "zod";
// import { Product, ProductVariants, ProductWithVariants } from "./productTypes";

export const addProductSchema = z.object({
    // product_id: z.string(),
    name: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    // images: z.array(z.string()),
    instructions: z.array(z.string()), // FIXED — stays array
    // hasNoVariant: z.boolean().optional(),
    base_price: z.number().int(),
})

export const productVariantSchema = z.object({
    // id: z.string(),
    // product_id: z.string(),
    // variant_code: z.string(),
    size_label: z.string(),
    price_kobo: z.number().int(),
    quantity_remaining: z.number().int(),
    // created_at: z.string().datetime(),
    // updated_at: z.string().datetime(),
})

export const productWithVariantsSchema =
    addProductSchema.extend({
        variants: z.array(productVariantSchema),
    });