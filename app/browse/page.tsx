'use client'

import { useSearchParams } from "next/navigation";
// import { useEffect } from "react";
import ProductList from "../components/client/productList";
import Herosection from "../components/client/herosection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../components/ui/breadcrumb";
import { HomeIcon } from "lucide-react";
import { Suspense } from "react";

const BrowseProductContent = () => {
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get('search');
    const category = searchParams.get('category');
    let text = 'Welcome to our store!';

    if (searchQuery) {
        text = `Search results for "${searchQuery}"`;
    } else if (category) {
        text = `${category}`;
    }

    // useEffect(() => {
    //     console.log("readSync")
    // }, [searchQuery])
    // console.log(searchQuery)
    return (
        <div>
            <Herosection text={text} />


            {/* {searchQuery && <p>{searchQuery}</p>} */}
            {/* {category && ( */}
            <section className="py-3 px-2">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem className="text-[9px]">
                            <BreadcrumbLink href="/"><HomeIcon size={16} /></BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator />
                        <BreadcrumbItem className="text-[16px]">
                            <BreadcrumbPage className="capitalize">{category || searchQuery}</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            {/* )} */}

            <ProductList filters={{ search: searchQuery || undefined, category: category || undefined }} />
        </div>
    )
}

const BrowseProductPage = () => {
    return (
        <Suspense fallback={<div className="w-full h-[50dvh] flex items-center justify-center bg-gray-300" ><h4 className="text-4xl">Loading products...</h4></div>}>
            <BrowseProductContent />
        </Suspense>
    )
}

export default BrowseProductPage;