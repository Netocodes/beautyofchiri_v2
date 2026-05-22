import { createClient } from '@supabase/supabase-js'

// 1. Grab the environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// 2. Add a fallback warning so it logs cleanly instead of throwing a fatal crash during compilation
if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        "⚠️ Supabase environment variables are missing! If this is happening during a Vercel build phase, fallback placeholders will be used temporarily."
    )
}

// 3. Provide safe placeholder strings to satisfy the Supabase SDK constructor during the build
export const BocAdmin = createClient(
    supabaseUrl || 'https://placeholder-project-id.supabase.co',
    supabaseAnonKey || 'placeholder-anon-key'
)