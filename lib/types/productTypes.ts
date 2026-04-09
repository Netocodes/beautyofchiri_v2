export type Product = {
    id: string;
    product_id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    tags: string[];
    cover_image: File;
    created_at: string; // timestamp
    updated_at: string; // timestamp
    images: string[]; // array of image URLs
    instructions: string[]; // usage instructions
    hasNoVariant: boolean; // if true, treat as single variant with base price
    base_price: number

}
type variantPayload = {
    variant_code: string;
    size_label: string;
    price_kobo: number;
    quantity_remaining: number;
}
export type ProductPayload = {
    name: string
    slug: string
    description: string
    category: string
    tags: string[]
    cover_image: string
    images?: File[]
    base_price: number
    instructions: string[]
    variants: variantPayload[]
}
export type ProductVariants = {
    id: string;
    product_id: string;
    variant_code: string;
    size_label: string;
    price_kobo: number;
    quantity_remaining: number;
    created_at: string;
    updated_at: string;
}
export type ProductWithVariants = Product & {
    variants: ProductVariants[];
}
export type Filters = {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
};
export type ProductsResponse = {
    success: boolean;
    products: ProductWithVariants[];
    pagination: {
        page: number;
        pageSize: number;
        total: number;
        totalPages: number;
    };
    filters: Filters;
};