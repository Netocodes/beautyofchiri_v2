'use client'

import { useCallback, useState } from "react"
import { useProducts } from "@/lib/tanstackQueries/products/product"
import Herosection from "./components/client/herosection"
import ProductList from "./components/client/productList"
import useEmblaCarousel from "embla-carousel-react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "./components/ui/select"
type Filters = {
  category?: string;
}

export default function Home() {
  // const user = useProfileStore((state) => state.user)
  const router = useRouter()
  const [emblaRef, embla] = useEmblaCarousel({
    axis: "x",
    dragFree: true,
    containScroll: "trimSnaps",
  })

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
  const { data: productsData, isLoading, isError, error } = useProducts(filters)

  if (isLoading) return <p>Loading...</p>

  if (isError) {
    console.log(error)
    return (
      <div className="w-full h-[50dvh] flex items-center justify-center bg-gray-300">
        <h4 className="text-4xl">We could not load the products try again later...</h4>
      </div>
    )

  }


  if (!productsData) return <p>No products found.</p>


  const products = productsData.products || []

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

  const staticTabs = ["all", "bestsellers"]
  const tabs = [...staticTabs, ...categories]

  const activeCategory = filters.category || "all"



  return (
    <div>
      <Herosection text="Welcome to our store!" helperText="Discover our latest products and exclusive deals." />

      {/* 🔥 Bumpa-style filter bar for tablet and desktop screens  */}
      <section className="hidden md:flex z-10 w-11/12 my-8 bg-bg-color/10  items-center justify-center rounded-lg mx-auto">
        <div className="">

          {/* Embla viewport */}
          <div className="overflow-hidden" ref={emblaRef}>

            {/* Embla container */}
            <div className="flex gap-3 py-4">
              {tabs.map((tab, index) => {
                const isActive = activeCategory === tab

                return (
                  <div key={tab} className="flex-shrink-0">
                    <button
                      key={tab}
                      onClick={() => {
                        setFilters((prev) => ({
                          ...prev,
                          category: tab === "all" ? undefined : tab,
                        }))
                        scrollTo(index) // 🔥 auto focus selected
                        router.push(`/browse?category=${tab === "all" ? "" : tab}`) // 🔥 update URL
                      }}
                      className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold capitalize transition
                ${isActive
                          ? "bg-black text-white"
                          : "bg-gray-100 text-gray-600"
                        }`}
                    >
                      {tab === "all"
                        ? "All"
                        : tab === "bestsellers"
                          ? "🔥 Best Sellers"
                          : tab}
                    </button>
                  </div>
                )
              })}
            </div>

          </div>
        </div>
      </section>

      <section className="flex md:hidden  z-10 w-10/12 my-5 bg-bg-color/10 py-2 items-center justify-center rounded-lg mx-auto">

        <Select value={activeCategory} onValueChange={(value) => {
          setFilters((prev) => ({
            ...prev,
            category: value === "all" ? undefined : value,
          }))
          router.push(`/browse?category=${value === "all" ? "" : value}`) // 🔥 update URL
        }}>
          <SelectTrigger className="w-full flex items-center gap-2 border-none! outline:bg-gray-100/10 text-lg px-2 py-1">
            <span className="font-bold">Browse Categories</span>
          </SelectTrigger>
          <SelectContent position="popper" >
            <SelectGroup className="flex flex-col gap-y-3">
              {tabs.map((tab) => (
                <SelectItem key={tab} value={tab} className="w-full flex py-3 text-md leading-1.5 gap-2">
                  {tab === "all"
                    ? "All"
                    : tab === "bestsellers"
                      ? "🔥 Best Sellers"
                      : tab}

                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </section>

      <section className="w-11/12 md:w-9/12 mx-auto">
        <ProductList filters={filters} />
      </section>

      {/* 👉 your products will already be filtered from backend */}
    </div>
  )
}