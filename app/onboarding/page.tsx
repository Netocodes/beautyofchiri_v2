

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Sparkles, ArrowRight } from "lucide-react";

export default async function Onboarding() {
    // Replace with your actual WhatsApp Group / Community Invite Link
    const whatsappCommunityLink = `https://chat.whatsapp.com/YOUR_COMMUNITY_INVITE_CODE`;

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center bg-black text-white px-4 py-12 overflow-hidden">

            {/* 1. BACKGROUND IMAGE & COLOR BLEND */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="https://images.unsplash.com/photo-1608248597260-3118f6e0c69a?q=80&w=1600&auto=format&fit=crop"
                    alt="Beauty of Chiri Glow Background"
                    fill
                    className="object-cover opacity-40 mix-blend-luminosity filter contrast-125"
                    priority
                />
                {/* Deep ambient dark gradient blend */}
                <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-950/80 to-rose-950/40" />
                {/* Subtle ambient glow effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 blur-[120px] rounded-full pointer-events-none" />
            </div>

            {/* 2. GLASSMORPHISM CARD CONTAINER */}
            <div className="relative z-10 w-full max-w-md p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-center space-y-6">

                {/* Brand Icon / Sparkle Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-medium text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Exclusive Beauty VIP Pass</span>
                </div>

                {/* Heading */}
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight bg-gradient-to-r from-amber-200 via-rose-200 to-white bg-clip-text text-transparent">
                        Beauty of Chiri
                    </h1>
                    <p className="text-sm text-neutral-300 leading-relaxed max-w-xs mx-auto">
                        Welcome to our inner circle! Join our vibrant WhatsApp community for secret drops, skincare tips, and direct VIP support.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-3">
                    {/* Main Action: WhatsApp Community */}
                    <a
                        href={whatsappCommunityLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-900/30 group"
                    >
                        <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                        <span>Join WhatsApp Community</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </a>

                    {/* Secondary Action: Skip using Next.js Link (Better SPA Performance) */}
                    <Link
                        href="/dashboard"
                        className="block w-full py-2.5 text-xs text-neutral-400 hover:text-white transition-colors underline-offset-4 hover:underline"
                    >
                        Skip to Dashboard for now
                    </Link>
                </div>

            </div>
        </div>
    );
}