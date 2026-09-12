// middleware.ts
import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/client";

export default async function userAuth(request: NextRequest) {
    const supabase = await createClient();

    // 2. Refresh session if expired
    const { data: { user } } = await supabase.auth.getUser();

    const path = request.nextUrl.pathname;
    // const location = request
    // console.log(location)

    // 3. Define routes that STRICTLY require authentication
    const protectedRoutes = ["/dashboard", "/settings", "/profile"];
    const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route));

    // 4. Kick unauthenticated users out of protected routes
    if (isProtectedRoute && !user) {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", path); // Optional: remember where they wanted to go
        return NextResponse.redirect(loginUrl);
    }


    // 5. If they are signed in and trying to hit /login or /signup, redirect them away
    const authRoutes = ["/login", "/signup"];
    if (authRoutes.includes(path) && user) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    return NextResponse.next();
}

// Optional: Limit middleware scope to optimize performance
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder assets
         */
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};