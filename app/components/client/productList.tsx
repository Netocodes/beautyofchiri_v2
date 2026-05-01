import Image from 'next/image'
import { useProducts } from '@/lib/tanstackQueries/products/product'
import { Filters, Product } from '@/lib/types/productTypes'
import React from 'react'

const ProductList = ({ filters }: { filters?: Filters }) => {
    const { data: productsData, isLoading, isError, error } = useProducts(filters)
    if (isLoading) return <p>Loading...</p>
    if (error) console.log(error)
    if (isError) return <p>Error: {error.details}</p>
    console.log(productsData)
    console.log(error)

    if (!productsData || productsData.pagination.total === 0) {
        return (
            <div className='w-full h-125 bg-bg-color/10'>
                <h2 className="text-2xl font-semibold mb-4">No products found.</h2>
                <p className="text-gray-600">Try adjusting your filters or check back later.</p>
            </div>
        );
    }
    return (
        <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-6" >
            {productsData.products.map((product, idx) => (
                <div key={idx} className="hover:bg-white hover:shadow-lg shadow-bg-color/20 p-3 rounded-b-md flex flex-col gap-2">

                    {/* Image (consistent height is the KEY) */}
                    <div className="w-full aspect-square overflow-hidden rounded-md relative">
                        <Image
                            src={product.cover_image}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Name */}
                    <h3 className="text-sm md:text-base font-medium uppercase line-clamp-2 leading-tight">
                        {product.name}
                    </h3>

                    {/* Price */}
                    <p className="font-semibold text-sm">
                        ${product.base_price.toFixed(2)}
                    </p>

                    {/* Button */}
                    <button className="w-full bg-black text-white py-2 mt-9 rounded-md text-sm">
                        Buy now
                    </button>
                </div>
            ))}
        </section>
    )
}

export default ProductList
