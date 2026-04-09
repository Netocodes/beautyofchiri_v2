import { useInfiniteProducts } from '@/lib/tanstackQueries/products/product'
import { Filters } from '@/lib/types/productTypes';
import React, { useState } from 'react'

const ProductswithFilter = () => {
    const [filters, setFilters] = useState<Filters>({
        search: "face",
        category: "",
        minPrice: 10000,
        maxPrice: undefined,
        sort: "new",
    });

    const {
        data,
        fetchNextPage,
        isLoading,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteProducts(filters);
    if (isLoading) {
        return <div>loading..</div>
    }
    console.log(data)
    return (
        <div>
            <h2>Products page</h2>
            <div>
                {/* Products */}
                {data?.pages.map((page, i) => (
                    <div key={i}>
                        {page.products.map((product) => (
                            <p key={product.id}>{product.name}</p>
                        ))}
                    </div>
                ))}

                {/* Load more button */}
                {hasNextPage && (
                    <button onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                )}
            </div>
        </div>
    )
}

export default ProductswithFilter
