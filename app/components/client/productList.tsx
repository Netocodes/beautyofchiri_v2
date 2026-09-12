import Image from 'next/image'
import { useProducts } from '@/lib/tanstackQueries/products/product'
import { Filters, Product } from '@/lib/types/productTypes'
import React from 'react'
import { ProductCardSkeleton } from '../skeletons/productCard'
import { Button } from '../ui/button'
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '../ui/pagination'
import { CustomPagination } from './customPagination'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

const ProductList = ({ filters, productSize }: { filters?: Filters, productSize?: number }) => {
    const searchParams = useSearchParams();
    const page = URLSearchParams ? Number(new URLSearchParams(searchParams.toString()).get("page")) || 1 : 1;
    const pageSize = productSize || 12; // Default to 12 if not provided

    const { data: productsData, isLoading, isError, error, refetch } = useProducts(filters, page, pageSize)
    if (isLoading) {
        return (
            <div className='w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6 my-4'>
                {[...Array(8)].map((_, idx) => (
                    <div key={idx} className="w-full ">
                        <ProductCardSkeleton />
                    </div>
                ))}
            </div>
        )

    }
    if (isError) console.log(error)
    console.log(productsData)
    console.log(error)

    if (!productsData || productsData.pagination.total === 0) {
        return (
            <div className='w-full h-[50dvh] flex flex-col items-center justify-center bg-bg-color/10'>
                <h2 className="text-2xl font-semibold mb-4">No products found.</h2>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
                <Button className="mt-4 text-md cursor-pointer" size="sm" onClick={() => refetch()}>
                    Refresh
                </Button>
            </div>
        );
    }
    return (
        <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-6" >
            {productsData.products.map((product, idx) => (
                <div key={idx} className="hover:bg-white bg-gray-100  hover:shadow-lg hovershadow-bg-color/20 p-3 rounded-b-md flex flex-col gap-2">

                    {/* Image (consistent height is the KEY) */}
                    <div className="w-full aspect-square overflow-hidden rounded-md relative">
                        <Image
                            src={product.cover_image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <Link href={`/product-page/${product.slug}/view`} className="text-lg font-semibold cursor-pointer" >
                        {/* Name */}
                        <h3 className="text-sm md:text-base font-medium uppercase line-clamp-2 leading-tight">
                            {product.name}
                        </h3>

                        {/* Price */}
                        <p className="font-semibold text-sm">
                            ${product.base_price.toFixed(2)}
                        </p>

                        {/* Button */}
                        <button className="w-full bg-bg-color text-white py-2 mt-9 rounded-md text-sm">
                            Buy now
                        </button>
                    </Link>

                </div>
            ))}

            <footer className="col-span-full mt-6 flex justify-center">
                <CustomPagination pagination={productsData.pagination} />
            </footer>
        </section>
    )
}

export default ProductList
