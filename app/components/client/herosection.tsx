import React from 'react'
import Magnet from '../NetoBits/Magnet'
type herosection = {
    text?: string
    helperText?: string
}

const Herosection = ({ text = "Welcome to our store!", helperText }: herosection) => {
    return (
        <section className='relative w-full h-fit md:h-[25dvh] flex items-center justify-center bg-bg-color overflow-hidden my-auto py-2 md:py-4'>
            {/* Subtle radial overlay for depth */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>

            <div className='relative z-10 max-w-4xl px-6 mx-auto'>
                <h1 className='text-2xl md:text-5xl font-extrabold tracking-wide text-center  cursor-grab py-1 md:py-3 px-1 rounded-lg  text-white leading-[1.1]'>
                    <Magnet padding={50} disabled={false} magnetStrength={10}>
                        <span className="block mb-2 text-transparent capitalize bg-clip-text bg-linear-to-b from-white to-white/70">
                            {text}
                        </span>
                    </Magnet>
                </h1>
                {helperText && (
                    <p className="text-lg text-center text-white/80 mt-1">
                        {helperText}
                    </p>
                )}

                {/* Optional decorative line often seen in modern heros */}
                <div className="w-16 h-1 mx-auto mt-6 rounded-full bg-primary-color/80"></div>
            </div>
        </section>
    )
}

export default Herosection
