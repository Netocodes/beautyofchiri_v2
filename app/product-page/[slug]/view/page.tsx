'use client'

import { ProductCarousel } from '@/app/components/client/productImageCarousel'
import type { ProductVariants } from '@/lib/types/productTypes'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/app/components/ui/breadcrumb'
import { urlParam } from '@/app/utils/dynamicUrl'
import { useGetProductDetails } from '@/lib/tanstackQueries/products/productDetails'
import { HomeIcon } from 'lucide-react'
import Image from 'next/image'
import React, { use, useState } from 'react'
import { RadioGroup, RadioGroupItem } from '@/app/components/ui/radio-group'
import { Label } from '@/app/components/ui/label'

const ViewFullProduct = ({ params }: urlParam) => {
    const { slug } = use(params)
    const { data, isLoading, isError, error } = useGetProductDetails(slug)

    // Array sorting (React Compiler automatically optimizes this without manual useMemo)
    const variants = data?.data?.variants;
    const sortedVariants = variants ? sortVariants(variants) : [];

    // In your component:
    const [selectedSize, setSelectedSize] = useState<string>("");

    if (isLoading) {
        return <p className='h-screen'>Loading...</p>
    }

    if (!data || isError) {
        return <p>Error loading product details: {error instanceof Error ? error.message : 'Unknown error from product View API'}</p>
    }

    console.log(data.data.variants)
    const basePrice = data.data.base_price;
    console.log(basePrice)
    const defaultProductSize = data.data?.variants?.find((price) => price.price_kobo === basePrice)?.size_label
    if (defaultProductSize && !selectedSize) {
        console.log('checked')
        setSelectedSize(defaultProductSize);


    }


    return (
        <>
            {/* Breadcrumb */}
            <section className="py-2 px-2 ml-4">
                <Breadcrumb className="py-2">
                    <BreadcrumbList className="flex-nowrap items-center text-xs sm:text-sm">
                        {/* Home Item */}
                        <BreadcrumbItem className="shrink-0">
                            <BreadcrumbLink
                                href="/"
                                className="group inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <div className="relative h-6 w-6 overflow-hidden rounded-full transition-transform group-hover:scale-105 sm:h-7 sm:w-7">
                                    <Image
                                        src="/beautyLogo.png"
                                        alt="Home"
                                        fill
                                        sizes="(max-width: 640px) 24px, 28px"
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                                <span className="hidden sm:inline-block">Homepage</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator className="shrink-0 text-muted-foreground/50" />
                        <BreadcrumbLink
                            href="/products"
                            className="group inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                            Products
                        </BreadcrumbLink>
                        <BreadcrumbSeparator className="shrink-0 text-muted-foreground/50" />

                        {/* Current Page Item */}
                        <BreadcrumbItem className="min-w-0">
                            <BreadcrumbPage className="truncate font-semibold tracking-tight text-foreground">
                                {data.data.slug}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            {/* Breadcrumb */}

            <section className='w-full flex flex-col items-center justify-center bg-[#f5f5f5]'>
                <div className="grid *:grid-cols-1  lg:grid-cols-[2fr_3fr] gap-8  w-11/12 md:w-9/12 p-4">


                    <ProductCarousel images={data.data.images} />

                    <section className='flex flex-col gap-2 p-4'>
                        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-2">
                            <h2 className='text-3xl font-semibold font-serif '>{data.data.name}</h2>
                            <p className='text-lg text-bg-color font-semibold px-2 mt-1 rounded text-center'>{data.data.category}</p>
                        </div>
                        <p className='text-text-gray-dim mt-4 ' >Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni illum molestias facere voluptates quaerat delectus sit laboriosam ipsam exercitationem itaque, placeat vero aspernatur eos facilis sequi veniam provident expedita saepe similique quis! Tempore, qui. Excepturi vero omnis aliquid impedit laudantium. Provident praesentium nulla nisi iure sequi, doloremque dignissimos.</p>

                        {/* radio buttons for selecting size */}
                        {data?.data?.variants && data.data.variants.length > 0 && (

                            <div className="flex flex-col gap-3 py-2  ">
                                {/* Section Header */}
                                <hr className="border-gray-500/70 mt-3" />



                                {/* Radio Group Wrapper */}
                                {sortedVariants.length > 0 && (
                                    <div className="flex flex-col gap-3 py-4">
                                        <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                                            Select Size / Variant
                                        </h3>

                                        <RadioGroup
                                            /* Pass variant ID or size string; fallback safely */
                                            value={String(selectedSize || defaultProductSize || sortedVariants[0]?.id)}
                                            onValueChange={(val) => {
                                                setSelectedSize(val);
                                            }}
                                            className="flex flex-wrap gap-2.5"
                                        >
                                            {sortedVariants.map((variant) => {
                                                // Use unique identifier for state comparison & radio value
                                                const variantValue = String(variant.id ?? variant.size_label);
                                                const itemId = `variant-option-${variantValue}`;

                                                const activeValue = String(selectedSize || defaultProductSize || sortedVariants[0]?.id);
                                                const isSelected = activeValue === variantValue;

                                                return (
                                                    <div
                                                        key={variant.id || variant.size_label}
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setSelectedSize(variantValue);
                                                        }}
                                                        className={`flex h-8 cursor-pointer select-none items-center gap-2.5 rounded-md border px-3 text-sm font-medium transition-all shadow-sm ${isSelected
                                                            ? "border-bg-color/55 bg-bg-color/55 text-primary-foreground dark:bg-primary"
                                                            : "border-neutral-400 bg-transparent text-foreground hover:bg-neutral-100 dark:border-neutral-500 dark:text-white dark:hover:bg-neutral-800"
                                                            }`}
                                                    >
                                                        <RadioGroupItem
                                                            value={variantValue}
                                                            id={itemId}
                                                            className="h-4 w-4 border-2 border-neutral-400 text-black dark:border-neutral-500 dark:text-white pointer-events-none"
                                                        />
                                                        <span className="text-sm font-bold text-gray-800 tracking-tight">
                                                            {variant.size_label}
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </RadioGroup>
                                    </div>
                                )}
                            </div>
                        )}

                        <hr className="border-gray-500/70 mt-2" />

                        <section className="flex items-center justify-between gap-2 mt-4">
                            <div className="text-2xl font-bold text-foreground mt-4">
                                $ {data.data.variants?.find((variant) => variant.size_label === selectedSize)?.price_kobo.toFixed(1) || data.data.base_price.toFixed(1)}
                            </div>

                        </section>

                    </section>
                </div>
            </section>
        </>
    )
}

export default ViewFullProduct

export function sortVariants<T extends { size_label: string }>(variants: T[]): T[] {
    return [...variants].sort((a, b) => {
        // Extract numbers from strings like "250ml", "1.5L", "50g"
        const numA = parseFloat(a.size_label.replace(/[^0-9.]/g, ""));
        const numB = parseFloat(b.size_label.replace(/[^0-9.]/g, ""));

        // If both have numbers, sort numerically
        if (!isNaN(numA) && !isNaN(numB)) {
            return numA - numB;
        }

        // Fallback to alphabetical sorting if no numbers are present
        return a.size_label.localeCompare(b.size_label, undefined, { numeric: true });
    });
}