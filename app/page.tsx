'use client'

import { useCallback, useState } from "react"
import { useProducts } from "@/lib/tanstackQueries/products/product"
import Herosection from "./components/client/herosection"
import ProductList from "./components/client/productList"
import useEmblaCarousel from "embla-carousel-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select"
import { Button } from "./components/ui/button"
import CardAdvert from "./components/client/cardAdvert"
import WhyChooseUs from "./components/client/chooseUs"
import CreateAccountAd from "./components/client/createAccountAd"
import SupportAndFAQ from "./components/client/faq"
import SkincareCategories from "./components/client/productGallery"
import { useGetProfile } from "@/lib/tanstackQueries/profile/profile"
type Filters = {
  category?: string;
}

export default function Home() {
  const { data: user, isLoading: isProfileLoading, error } = useGetProfile()

  const router = useRouter()

  const [emblaRef, embla] = useEmblaCarousel({
    axis: "x",
    dragFree: true,
    containScroll: "trimSnaps",
  })


  console.log(user)
  const scrollTo = useCallback(
    (index: number) => {
      if (!embla) return
      embla.scrollTo(index)
    },
    [embla]
  )
  // ✅ filters state
  const [filters, setFilters] = useState<Filters>({})


  // ✅ pass filters into query
  const { data: productsData, isLoading, isRefetching, isError: isProductError, error: productError, refetch: productsRefetch } = useProducts(filters)

  // if (isRefetching) return <p>Loading...</p>



  if (isProfileLoading) {
    return <p>Loading...</p>
  }
  if (error) {
    return <p>Error loading profile: {error.message}</p>
  }


  const products = productsData?.products || []

  const cleanCategory = (value: string) => {
    if (!value) return ""
    return value
      .toLowerCase()
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
  }

  // ✅ unique categories
  const categories: string[] = []
  for (const product of products) {
    const cat = cleanCategory(product.category)
    if (!cat) continue
    if (!categories.includes(cat)) {
      categories.push(cat)
    }
  }

  const staticTabs = ["all"]
  const tabs = [...staticTabs, ...categories]

  const activeCategory = filters.category || "all"



  return (
    <div>
      <Herosection text="Welcome to our store!" helperText="Discover our latest products and exclusive deals." />

      <section className="mt-12 mb-8 mx-auto">
        <CardAdvert />
      </section>
      {
        isProductError && !productsData ? (
          <div className="w-10/12 h-[50dvh] mx-auto my-8 flex flex-col items-center justify-center bg-gray-300">
            <h4 className="text-2xl ">We could not load the products try again later...</h4>
            <Button className="mt-4 py-1.5 px-2 text-md cursor-pointer" size="sm" onClick={() => productsRefetch()}>
              Refresh
            </Button>
          </div>
        ) : (
          <>      {/* 🔥 Bumpa-style filter bar for tablet and desktop screens  */}
            <section className="hidden md:flex z-10 w-11/12 md:8/12 my-6 mx-auto items-center justify-center">
              {/* Embla viewport */}
              <div className="overflow-hidden w-full px-2 py-1" ref={emblaRef}>
                {/* Embla container */}
                <div className="flex gap-2.5 items-center">
                  {tabs.map((tab, index) => {
                    const isActive = activeCategory === tab || (!activeCategory && tab === "all")

                    return (
                      <div key={tab} className="flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setFilters((prev) => ({
                              ...prev,
                              category: tab === "all" ? undefined : tab,
                            }))
                            scrollTo(index) // 🔥 auto focus selected
                            router.push(`/browse?category=${tab === "all" ? "" : tab}`) // 🔥 update URL
                          }}
                          className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/40 ${isActive
                            ? "bg-foreground text-background shadow-md scale-105"
                            : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                            }`}
                        >
                          {tab === "all" ? (
                            "All Categories"
                          ) : tab === "bestsellers" ? (
                            <span className="flex items-center gap-1.5 font-semibold text-amber-500 dark:text-amber-400">
                              <span>🔥</span> Best Sellers
                            </span>
                          ) : (
                            tab
                          )}
                        </button>
                      </div>
                    )
                  })}
                </div>
              </div>
            </section>

            <section className="flex md:hidden z-10 w-11/12 max-w-md my-4 mx-auto">
              <Select
                value={activeCategory || "all"}
                onValueChange={(value) => {
                  setFilters((prev) => ({
                    ...prev,
                    category: value === "all" ? undefined : value,
                  }))
                  router.push(`/browse?category=${value === "all" ? "" : value}`)
                }}
              >
                <SelectTrigger className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-background/80 backdrop-blur-md border border-border/50 hover:border-primary/30 rounded-xl shadow-xs transition-all duration-200 outline-none focus:ring-2 focus:ring-primary/20">
                  <div className="flex items-center gap-2 truncate">
                    <span className="text-sm uppercase tracking-wider font-semibold text-muted-foreground">Category:</span>
                    <SelectValue placeholder="Select Category" className="font-medium capitalize text-foreground" />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className="w-[var(--radix-select-trigger-width)] max-h-[300px] bg-popover/95 backdrop-blur-lg border border-border/40 rounded-xl shadow-xl p-1 z-50 animate-in fade-in-80 zoom-in-95"
                >
                  <SelectGroup className="space-y-0.5">
                    {tabs.map((tab) => (
                      <SelectItem
                        key={tab}
                        value={tab}
                        className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors cursor-pointer text-popover-foreground hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground outline-none"
                      >
                        {tab === "all" ? (
                          <span className="flex items-center gap-2">All Categories</span>
                        ) : tab === "bestsellers" ? (
                          <span className="flex items-center gap-2 font-semibold text-amber-500 dark:text-amber-400">
                            <span>🔥</span> Best Sellers
                          </span>
                        ) : (
                          <span className="capitalize">{tab}</span>
                        )}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
            {/* 🔥 Bumpa-style filter bar for tablet and desktop screens  */}



            <section className="w-11/12 md:10/12  mx-auto">
              <ProductList filters={filters} productSize={4} />
            </section>
          </>

        )}

      <SkincareCategories />


      <WhyChooseUs />

      {user && <CreateAccountAd />}

      <section className="w-11/12 md:10/12 mx-auto">
        <SupportAndFAQ />
      </section>

      {/* 👉 your products will already be filtered from backend */}
    </div>
  )
}