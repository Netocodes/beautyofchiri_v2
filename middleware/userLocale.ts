// app/middleware/userLocale.ts
import { NextResponse, NextRequest } from "next/server";
import { geolocation } from "@vercel/functions";

export default function handleUserLocale(request: NextRequest) {
    const geo = geolocation(request);

    // 1. Check if the user manually saved a currency preference in their cookies
    const savedCurrency = request.cookies.get("user-currency")?.value;

    // 2. Resolve Country (Defaulting to 'NG' for local testing)
    const country =
        geo.country ||
        process.env.MOCK_COUNTRY ||
        (process.env.NODE_ENV === "development" ? "NG" : "NG");

    // 3. Determine base currency based on location if no cookie exists
    let defaultCurrency = "USD";
    if (country === "TR") defaultCurrency = "TRY";
    if (country === "NG") defaultCurrency = "NGN";

    const activeCurrency = savedCurrency || defaultCurrency;

    // 4. Attach to request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-country", country);
    requestHeaders.set("x-user-currency", activeCurrency);

    return NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });
}