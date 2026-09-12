import React from 'react'
import Magnet from '../NetoBits/Magnet'

interface HeroSectionProps {
    text?: string
    helperText?: string
}

const Herosection = ({ text = "Welcome to our store!", helperText }: HeroSectionProps) => {
    return (
        <section className="relative w-full min-h-50 md:min-h-60  flex items-center justify-center bg-bg-color overflow-hidden py-8 md:py-12 my-auto">
            {/* Subtle radial overlay for visual depth */}
            <div
                aria-hidden="true"
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_0%,transparent_70%)] pointer-events-none"
            />

            <div className="relative z-10 max-w-4xl px-6 mx-auto text-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight py-1 px-1 text-white leading-tight">
                    <Magnet padding={50} disabled={false} magnetStrength={10}>
                        <span className="inline-block capitalize bg-clip-text text-transparent bg-gradient-to-b from-white via-white/90 to-white/70 drop-shadow-xs">
                            {text}
                        </span>
                    </Magnet>
                </h1>

                {helperText && (
                    <p className="text-base md:text-lg text-white/80 mt-3 max-w-2xl mx-auto font-normal leading-relaxed">
                        {helperText}
                    </p>
                )}

                {/* Decorative subtle accent indicator */}
                <div className="w-12 h-1 mx-auto mt-5 rounded-full bg-primary-color/80 opacity-90" />
            </div>
        </section>
    )
}

export default Herosection