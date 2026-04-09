import { generateProductId } from "@/app/utils/idGenerator";
import { verifyUser } from "@/lib/adminGuard";
import { productWithVariantsSchema } from "@/lib/zodSchema";
import { NextResponse } from "next/server";
import { BocAdmin } from "@/lib/supabaseLogs";
import { randomUUID } from "crypto";

export const POST = async (req: Request) => {
    try {
        const isAuthorized = verifyUser(req);

        if (!isAuthorized) {
            return NextResponse.json(
                { success: false, message: "Unauthorized" },
                { status: 401 }
            );
        }

        const rawData = await req.formData();
        const productData = JSON.parse(rawData.get("data") as string);

        if (!productData) {
            return NextResponse.json(
                { success: false, message: "Could not verify or authorize this product data" },
                { status: 400 }
            );
        }

        const coverImage = rawData.get("cover_image") as File;

        if (!coverImage) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        'You did not submit the cover image correctly. Use key "cover_image".',
                },
                { status: 400 }
            );
        }

        const images = rawData.getAll("images") as File[];



        const parsed = productWithVariantsSchema.safeParse(productData);

        if (!parsed.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Could not validate Products",
                    errors: parsed.error.flatten().fieldErrors,
                },
                { status: 400 }
            );
        }

        const GenProductId = generateProductId(parsed.data.name);

        /*
         -------------------------
         UPLOAD COVER IMAGE
         -------------------------
        */

        const coverExt = coverImage.name.split(".").pop();
        const CoverImageName = `${GenProductId}/cover-${randomUUID()}.${coverExt}`;

        const coverBuffer = Buffer.from(await coverImage.arrayBuffer());

        const { error: coverImageError } = await BocAdmin.storage
            .from("product_images")
            .upload(CoverImageName, coverBuffer, {
                contentType: coverImage.type,
            });

        if (coverImageError) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Failed to upload cover image: ${coverImageError.message}`,
                },
                { status: 500 }
            );
        }

        const { data: coverUrlData } = BocAdmin.storage
            .from("product_images")
            .getPublicUrl(CoverImageName);

        const coverUrl = coverUrlData.publicUrl;

        /*
         -------------------------
         PARALLEL IMAGE UPLOAD
         -------------------------
        */

        const uploadedImageUrls = await Promise.all(
            images.map(async (file) => {
                const ext = file.name.split(".").pop(); //jpg png pdf
                const fileName = `${GenProductId}/${randomUUID()}.${ext}`;

                const buffer = Buffer.from(await file.arrayBuffer()); // research this Pls, how does the binary data work

                const { error } = await BocAdmin.storage
                    .from("product_images")
                    .upload(fileName, buffer, {
                        contentType: file.type,
                    });

                if (error) {
                    throw new Error(`Failed to upload image: ${error.message}`);
                }

                const { data } = BocAdmin.storage
                    .from("product_images")
                    .getPublicUrl(fileName);

                return data.publicUrl;
            })
        );

        /*
         -------------------------
         FORMAT VARIANTS
         -------------------------
        */

        const formattedVariants = parsed.data.variants.map((variant, index) => {
            const variantNumber = index + 1;

            const variantCode =
                GenProductId.split("-")[0] +
                "-" +
                GenProductId.split("-")[2] +
                "-" +
                variantNumber; //check this later i think it's for getting the boc-in the product id

            return {
                ...variant,
                product_id: GenProductId,
                variant_code: variantCode,
            };
        });

        /*
         -------------------------
         PRODUCT OBJECT
         -------------------------
        */

        const formattedProducts = {
            product_id: GenProductId,
            name: parsed.data.name,
            slug: parsed.data.slug,
            description: parsed.data.description,
            category: parsed.data.category,
            tags: parsed.data.tags,
            cover_image: coverUrl,
            images: uploadedImageUrls,
            instructions: parsed.data.instructions,
            base_price: parsed.data.base_price,
        };

        /*
         -------------------------
         INSERT PRODUCT
         -------------------------
        */

        const { error: productError } = await BocAdmin
            .from("products")
            .insert(formattedProducts);

        if (productError?.code === "23505") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product with this slug already exists",
                },
                { status: 409 }
            );

        }

        if (productError) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Failed to insert product: ${productError.message}`,
                    details: productError.details
                },
                { status: 500 }
            );
        }

        /*
         -------------------------
         INSERT VARIANTS
         -------------------------
        */

        const { error: variantError } = await BocAdmin
            .from("product_variants")
            .insert(formattedVariants);

        if (variantError) {
            await BocAdmin
                .from("products")
                .delete()
                .eq("product_id", GenProductId);

            return NextResponse.json(
                {
                    success: false,
                    message: variantError.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                productId: GenProductId,
                message: "Added Products Successfully.",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {
                success: false,
                message: `Internal server error: ${error instanceof Error ? error.message : String(error)
                    }`,
            },
            { status: 500 }
        );
    }
};