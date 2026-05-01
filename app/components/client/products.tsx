import { useProducts } from '@/lib/tanstackQueries/products/product';
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
        isLoading,
    } = useProducts(filters);
    if (isLoading) {
        return <div>loading..</div>
    }
    console.log(data)
    return (
        <div>
            <h2>Products page</h2>
            <div>
                {/* Products */}
                {/* {data?.products.map((, i) => (
                <div key={i}>
                    <p key={product.id}>{product.name}</p>
                </div>
                ))} */}

                {/* Load more button */}
                {/* {hasNextPage && (
                    <button onClick={() => fetchNextPage()}>
                        {isFetchingNextPage ? "Loading..." : "Load More"}
                    </button>
                )} */}
            </div>
        </div>
    )
}

export default ProductswithFilter
