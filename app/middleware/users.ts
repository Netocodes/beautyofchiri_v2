// middleware.ts
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function middleware(request: Request) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}