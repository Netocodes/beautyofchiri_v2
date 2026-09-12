import Image from "next/image";
import Link from "next/link";
import { Sparkles, Heart, ShieldCheck, Truck, Instagram, Twitter, Facebook, ArrowRight } from "lucide-react";

export default function SkincareFooter() {

    return (
        <footer className="relative bg-neutral-950 text-neutral-300 overflow-hidden pt-16 pb-8">

            {/* BACKGROUND IMAGE WITH OVERLAY */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/skincare-bg.png" // Replace with your texture/skincare aesthetic photo path
                    alt="Skincare Aesthetic Texture"
                    fill
                    className="object-cover opacity-20 filter grayscale contrast-125"
                    priority
                />
                {/* Dark radial gradient overlay for readable text */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
            </div>

            {/* CONTENT WRAPPER */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* TOP BRAND BADGES */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-neutral-800 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Sparkles className="w-8 h-8 text-rose-300 shrink-0" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">100% Authentic Formulas</h4>
                            <p className="text-xs text-neutral-400">Directly sourced from trusted global brands.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Heart className="w-8 h-8 text-rose-300 shrink-0" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">Skin Barrier First</h4>
                            <p className="text-xs text-neutral-400">Curated specifically to hydrate, heal, and glow.</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                        <Truck className="w-8 h-8 text-rose-300 shrink-0" />
                        <div>
                            <h4 className="text-white font-semibold text-sm">Fast Dispatch Across Nigeria</h4>
                            <p className="text-xs text-neutral-400">Safe packaging so your holy grails arrive pristine.</p>
                        </div>
                    </div>
                </div>

                {/* MAIN NAVIGATION & NEWSLETTER */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12">

                    {/* BRAND COLUMN */}
                    <div className="lg:col-span-2 space-y-4">
                        <Link href="/" className="inline-block">
                            <span className="text-2xl font-serif font-bold tracking-wider text-white">
                                BEAUTY OF<span className="text-rose-400 italic">CHIRI</span>
                            </span>
                        </Link>
                        <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
                            We live and breathe skincare. From hydrating essences to active serums, we bring you genuine formulations engineered to unlock your ultimate natural skin health.
                        </p>

                        {/* SOCIAL LINKS */}
                        <div className="flex items-center gap-3 pt-2">
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 transition-colors">
                                <Instagram className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </a>
                            <a href="#" className="p-2.5 rounded-full bg-white/5 hover:bg-rose-500/20 text-neutral-300 hover:text-rose-300 transition-colors">
                                <Facebook className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-rose-300 mb-4">
                            Shop Routines
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Cleansers & Toners</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Serums & Ampoules</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Moisturizers & Oils</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Sunscreens (SPF)</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Exfoliants & Masks</Link></li>
                        </ul>
                    </div>

                    {/* HELP & CONCIERGE */}
                    <div>
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-rose-300 mb-4">
                            Skin Care Concierge
                        </h3>
                        <ul className="space-y-2.5 text-sm">
                            <li><Link href="#" className="hover:text-white transition-colors">Routine Finder Quiz</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Track Your Order</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Authenticity Guarantee</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="#" className="hover:text-white transition-colors">Contact Support</Link></li>
                        </ul>
                    </div>

                    {/* SKINCARE CLUB NEWSLETTER */}
                    <div className="lg:col-span-1 space-y-3">
                        <h3 className="text-xs font-semibold uppercase tracking-widest text-rose-300">
                            The Glow Club
                        </h3>
                        <p className="text-xs text-neutral-400">
                            Join 10,000+ skin lovers. Get routine tips, restock alerts, and exclusive promos.
                        </p>
                        {/* <form onSubmit={() => alert("Submitted")} className="space-y-2 pt-1">
                            <div className="relative">
                                <input
                                    type="email"
                                    required
                                    placeholder="Your skincare email..."
                                    className="w-full px-4 py-2.5 text-xs bg-white/5 border border-white/10 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-rose-400 transition-colors"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-1 top-1 bottom-1 px-3 bg-rose-500 hover:bg-rose-600 text-white rounded-lg transition-colors flex items-center justify-center"
                                >
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </form> */}
                    </div>

                </div>

                {/* BOTTOM COPYRIGHT & LEGAL */}
                <div className="pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
                    <p>© {new Date().getFullYear()} Beauty of Chiri. Formulated with love for healthy skin.</p>
                    <div className="flex gap-6">
                        <Link href="#" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-neutral-300 transition-colors">Ingredient Glossary</Link>
                    </div>
                </div>

            </div>
        </footer>
    );
}