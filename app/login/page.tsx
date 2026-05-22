"use client"

import { supabase } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { useState, Suspense } from "react"

// 1. Move the functional logic to an internal component
const RegisterContent = () => {
    const params = useSearchParams()
    const error = params.get("error")
    const [isLoading, setIsLoading] = useState(false)

    const signIn = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: { redirectTo: `${window.location.origin}/auth/callback` }
            })
            if (error) setIsLoading(false)
        } catch {
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Login failed. Please try again.</p>
                <button onClick={signIn} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Try Again</button>
            </div>
        )
    }

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