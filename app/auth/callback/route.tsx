import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";
import { profile } from "@/lib/types/profileType"

export const GET = async (request: Request) => {
    const requestUrl = new URL(request.url);
    const code = requestUrl.searchParams.get("code");
    console.log(requestUrl)

    // ❌ No code → send back to login
    if (!code) {
        console.error('no callback exchange  code found')
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // ✅ Create Supabase server client (with cookies)
    const supabase = await createClient();

    // 🔑 Exchange code → session (THIS writes cookies)
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("OAuth exchange error:", error);
        return NextResponse.redirect(new URL("/login?error=OAuth exhange error", request.url));
    }

    // ✅ Get user (now available because cookies were set)
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // ⚠️ Safety check
    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    console.log(user)

    const { data: Profile } = await supabase.from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

    //  onboarding logic (clean way)
    if (Profile.role === 'admin') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    if (!Profile.onboarding_completed) {
        return NextResponse.redirect(new URL("/onboarding", request.url));
    }

    // ✅ Default redirect
    return NextResponse.redirect(new URL("/", request.url));
}