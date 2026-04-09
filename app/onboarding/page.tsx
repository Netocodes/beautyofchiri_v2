"use client";


export default function Onboarding() {
    const whatsappLink = `https://wa.me/234XXXXXXXXXX?text=Hi%20I%20just%20joined%20Beauty%20of%20Chiri`;
    // const On
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-6 text-center">
            <h1 className="text-2xl font-bold mb-3 text-yellow-400">
                Welcome to Beauty of Chiri ✨
            </h1>

            <p className="text-sm text-gray-300 max-w-sm">
                You&apos;re now part of a premium beauty experience.
                Connect with us instantly to start shopping or ask questions.
            </p>

            <button
                onClick={() => window.location.href = whatsappLink}
                className="mt-6 bg-green-500 hover:bg-green-600"
            >
                Continue on WhatsApp
            </button>

            <button
                onClick={() => window.location.href = "/dashboard"}
                className="mt-4 text-xs underline text-gray-400"
            >
                Skip for now
            </button>
        </div>
    );
}