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
            <section className="px-4 py-3">
                <Breadcrumb>
                    <BreadcrumbList className="flex-nowrap items-center gap-1.5 text-xs sm:text-sm">
                        {/* Home Link */}
                        <BreadcrumbItem className="shrink-0">
                            <BreadcrumbLink
                                href="/"
                                className="inline-flex items-center gap-1.5 font-medium transition-colors hover:text-foreground"
                            >
                                <HomeIcon className="h-4 w-4 shrink-0" />
                                <span>Homepage</span>
                            </BreadcrumbLink>
                        </BreadcrumbItem>

                        <BreadcrumbSeparator className="shrink-0" />

                        {/* Current Page / Category */}
                        <BreadcrumbItem className="min-w-0">
                            <BreadcrumbPage className="truncate font-semibold capitalize tracking-tight">
                                {category || searchQuery}
                            </BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
            </section>
            {/* )} */}

            <section className="w-11/12 md:w-9/12 mx-auto">

                <ProductList filters={{ search: searchQuery || undefined, category: category || undefined }} />
            </section>
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