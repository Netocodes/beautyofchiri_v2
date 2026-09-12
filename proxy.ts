// middleware.ts
import type { NextRequest } from "next/server";
import handleUserLocale from "./middleware/userLocale";
import userAuth from "./middleware/users";

export async function proxy(request: NextRequest) {
    // Call your custom locale middleware function
    // console.log(handleUserLocale(request))
    handleUserLocale(request);
    await userAuth(request); // Call your user authentication middleware function
    return
}

// Ensure it runs on page requests only
export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};