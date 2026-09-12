
import Image from "next/image";
import Link from "next/link";

interface Category {
    title: string;
    image: string;
    href: string;
}

const categories: Category[] = [
    {
        title: "Cleansers",
        image: "/ui/cleanser.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/cleansers",
    },
    {
        title: "Exfoliants",
        image: "/ui/exfoliant.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/exfoliants",
    },
    {
        title: "Treats & Masques",
        image: "/ui/treats.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/treatments",
    },
    {
        title: "Toners",
        image: "/ui/toner.jpg  ", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/toners",
    },
    {
        title: "Toners",
        image: "/ui/toner.jpg  ", // Replace with your texture/skincare aesthetic photo path   
        href: "/shop/toners",
    },
    {
        title: "Hydrators",
        image: "/ui/hydrator.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/hydrators",
    },
    {
        title: "Eyes & Lips",
        image: "/ui/eye&lip.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/eyes-lips",
    },
    {
        title: "Shaving",
        image: "/ui/shaving.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/shaving",
    },
    {
        title: "Sun Care",
        image: "/ui/suncare.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/sun-care",
    },
    {
        title: "Kits",
        image: "/ui/kit.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/kits",
    },
    {
        title: "Bundles",
        image: "/ui/bundle.jpg", // Replace with your texture/skincare aesthetic photo path
        href: "/shop/bundles",
    },

];

export default function SkincareCategories() {

    return (
        <section className="w-full bg-[#f9f6f0] text-[#e8e5de] py-16 px-4 md:px-8">
            <div className="max-w-[1400px] mx-auto">

                {/* Subtle Editorial Header */}
                <div className="mb-8 border-b border-[#33312c] pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <span className="text-xs tracking-[0.2em] uppercase text-[#272520] font-mono">
                            Browse Formulations
                        </span>
                        <h2 className="text-2xl md:text-3xl font-serif tracking-tight text-[#2d2c29] mt-1">
                            Shop by Category
                        </h2>
                    </div>
                    <p className="text-xs text-[#2b2a28] max-w-md leading-relaxed font-light">
                        Targeted solutions formulated for all skin types, routines, and daily rituals.
                    </p>
                </div>

                {/* 6-COLUMN LUXURY EDITORIAL GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-[1px] bg-[#33312c] border border-[#33312c]">
                    {categories.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className="group relative bg-[#1c1b18] aspect-[4/5] overflow-hidden block"
                        >
                            {/* Image with subtle slow zoom on hover */}
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover object-center grayscale-[20%] contrast-110 opacity-85 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                />

                                {/* Vignette Overlay for Text Legibility */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-40" />
                            </div>

                            {/* Title Overlay (Top Left aligned like Aesop UI) */}
                            <div className="absolute top-3 left-3 right-3 z-10">
                                <h3 className="text-sm font-medium tracking-wide text-white drop-shadow-md group-hover:translate-x-0.5 transition-transform duration-300">
                                    {item.title}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}