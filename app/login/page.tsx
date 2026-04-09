"use client"

import { supabase } from "@/lib/supabase/client"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

const RegisterPage = () => {
    const params = useSearchParams()
    const error = params.get("error")
    const [isLoading, setIsLoading] = useState(false)

    const signIn = async () => {
        // Loading starts
        setIsLoading(true)

        // try catch for unusual error & global Errors
        try {
            // we get the error only from the supabase 'signInWithOAuth' because after succesful it redirects us to the callback, so the error shows if it is unsuccessful
            const { error } = await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`
                }
                // un-comment this if you changed the supabase redirect point to a diffrent path
            })
            if (error) {
                console.error("Error signing in:", error.message)
                setIsLoading(false)
            }
            // If successful, user is redirected - no need to handle state here
        } catch (error) {
            console.log("Unexpected error during sign-in:", error instanceof Error ? error.message : String(error))
            setIsLoading(false)
        } finally {
            setIsLoading(true)
        }
    }

    if (error) {
        return (
            <div className="p-4 text-center">
                <p className="text-red-500">Login failed. Please try again.</p>
                <button
                    onClick={() => signIn()}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Try Again
                </button>
            </div>
        )
    }

    return (
        <div className="p-4 text-center">
            <p className="mb-4">Why are you in a rush to login?</p>
            <button
                onClick={() => signIn()}
                disabled={isLoading}
                className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            >
                {isLoading ? "Redirecting..." : "Sign in with Google"}
            </button>
        </div>
    )
}

export default RegisterPage