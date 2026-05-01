// components/CurrencyProvider.tsx
"use client";

import { useEffect } from "react";

import { useCurrencyStore } from "@/app/store/currency";

export default function CurrencyProvider({ children }: { children: React.ReactNode }) {
    const fetchRates = useCurrencyStore((state) => state.fetchRates);

    useEffect(() => {
        // This runs only on the client side after the page loads
        fetchRates();
        console.log("Fetching currency rates...");
    }, [fetchRates]);

    return <>{children}</>;
}