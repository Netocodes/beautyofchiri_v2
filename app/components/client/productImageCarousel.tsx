"use client"

import * as React from "react"
import Image from "next/image"
import { type CarouselApi } from "@/app/components/ui/carousel"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/app/components/ui/carousel"
import { cn } from "@/lib/utils"

interface DownCarouselProps {
    images: string[]
}

export const ProductCarousel = ({ images }: DownCarouselProps) => {
    const [selectedIndex, setSelectedIndex] = React.useState(0)
    const [mainApi, setMainApi] = React.useState<CarouselApi>()
    const [thumbApi, setThumbApi] = React.useState<CarouselApi>()

    // Sync state when sliding the main carousel
    React.useEffect(() => {
        if (!mainApi) return

        const onSelect = () => {
            const index = mainApi.selectedScrollSnap()
            setSelectedIndex(index)
            thumbApi?.scrollTo(index)
        }

        mainApi.on("select", onSelect)
        return () => {
            mainApi.off("select", onSelect)
        }
    }, [mainApi, thumbApi])

    // Scroll to selected slide when clicking a thumbnail
    const handleThumbClick = (index: number) => {
        setSelectedIndex(index)
        mainApi?.scrollTo(index)
    }

    if (!images || images.length === 0) {
        return null
    }

    return (
        <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto p-4">
            {/* Main Image Carousel */}
            <div className="relative w-full">
                <Carousel setApi={setMainApi} className="w-full">
                    <CarouselContent>
                        {images.map((img, idx) => (
                            <CarouselItem key={idx}>
                                <div className="relative aspect-square w-full overflow-hidden rounded-xl border bg-muted">
                                    <Image
                                        src={img}
                                        alt={`Product preview ${idx + 1}`}
                                        fill
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        priority={idx === 0}
                                        className="object-cover"
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious variant="secondary" className="left-3 rounded-md cursor-pointer" />
                    <CarouselNext variant="secondary" className="right-3 rounded-md cursor-pointer" />
                </Carousel>
            </div>

            {/* Thumbnail Bar */}
            <div className="w-full max-w-md px-8">
                <Carousel
                    setApi={setThumbApi}
                    opts={{
                        align: "start",
                        containScroll: "keepSnaps",
                    }}
                    className="w-full mx-auto overflow-hidden"
                >
                    <CarouselContent className="-ml-2">
                        {images.map((image, index) => {
                            console.log(image)
                            const isSelected = selectedIndex === index
                            return (
                                <CarouselItem
                                    key={index}
                                    className="pl-2 basis-1/4 sm:basis-1/5"
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleThumbClick(index)}
                                        className={cn(
                                            "relative aspect-square w-full overflow-hidden rounded-lg border-2 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                                            isSelected
                                                ? "border-primary ring-2 ring-primary/30 opacity-100 scale-95"
                                                : "border-transparent opacity-60 hover:opacity-100"
                                        )}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Thumbnail ${index + 1}`}
                                            fill
                                            sizes="100px"
                                            className="object-cover"
                                        />
                                    </button>
                                </CarouselItem>
                            );
                        })}
                    </CarouselContent>
                    {/* <CarouselPrevious className="-left-6 h-8 w-8" />
                    <CarouselNext className="-right-6 h-8 w-8" /> */}
                </Carousel>
            </div>
        </div>
    )
}