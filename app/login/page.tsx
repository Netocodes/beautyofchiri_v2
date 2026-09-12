"use client"

import { createWebClient } from "@/lib/supabase/publicClient"
import { useGetProfile } from "@/lib/tanstackQueries/profile/profile"
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

// 1. Move the functional logic to an internal component
const RegisterContent = () => {
    const params = useSearchParams()
    const error = params.get("error")
    const { data, error: profileError, isLoading: isProfileLoading } = useGetProfile()
    const [isLoading, setIsLoading] = useState(false)
    console.log(data)

    const signIn = async () => {
        setIsLoading(true)

        // Log before calling
        console.log("Supabase URL:", process.env.NEXT_PUBLIC_SUPABASE_URL)

        const supabase = await createWebClient()
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
                skipBrowserRedirect: false // Ensures full page redirect
            },
        })

        if (error) {
            console.error("SUPABASE ERROR:", error.message)
            alert(`OAuth Error: ${error.message}`)
            setIsLoading(false)
            return
        }

        if (data?.url) {
            // Force manual browser navigation if automatic redirect failed
            window.location.href = data.url
        }
    }

    // if (error) {
    //     return (
    //         <div className="p-4 text-center">
    //             <p className="text-red-500">Login failed. Please try again.</p>
    //             <button onClick={signIn} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Try Again</button>
    //         </div>
    //     )
    // }

    return (
        <div className="p-4 text-center">
            <p className="mb-4">Why are you in a rush to login?</p>
            <button onClick={signIn} disabled={isLoading} className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50">
                {isLoading ? "Redirecting..." : "Sign in with Google"}
            </button>
        </div>
    )
}

// 2. The default export acts as the shell putting Suspense over it
const RegisterPage = () => {
    return (
        <Suspense fallback={<div className="p-4 text-center">Loading form...</div>}>
            <RegisterContent />
        </Suspense>
    )
}

export default RegisterPage