import { create } from "zustand";
import { persist } from "zustand/middleware";
import { FetchApi } from "../utils/fetchInstance";
const Rates_API_URL = process.env.NEXT_PUBLIC_RATES_API_URL

type Currency = "NGN" | "TRY";

interface CurrencyState {
    currency: Currency;
    rates: Record<Currency, number>;
    setCurrency: (currency: Currency) => void;
    fetchRates: () => Promise<void>;
    convert: (amount: number) => number;
}

export const useCurrencyStore = create(
    persist<CurrencyState>(
        (set, get) => ({
            currency: "NGN",

            // ACCURATE 2026 DEFAULTS
            rates: {
                NGN: 1,
                TRY: 0.032836, // 1 NGN ≈ 0.0328 TRY
            },

            setCurrency: (currency) => set({ currency }),

            fetchRates: async () => {
                console.log('starting')
                try {
                    const response = await FetchApi(
                        `https://v6.exchangerate-api.com/v6/${Rates_API_URL}/latest/USD`
                    );
                    console.log(response)

                } catch (error) {
                    // Detailed error logging
                    const errorMessage = error instanceof Error ? error.message : "Unknown error";
                    console.error(errorMessage)
                    // console.error("--- Currency Fetch Error ---");
                    // console.error(`Timestamp: ${new Date().toISOString()}`);
                    // console.error(`Message: ${errorMessage}`);
                    // console.error(`Note: App is falling back to ${get().rates.TRY} (persisted or default).`);
                    // console.error("----------------------------");

                    // Optional: You could set an 'error' state here to show a UI warning
                }
            },

            convert: (amount) => {
                const { currency, rates } = get();
                return amount * (rates[currency] || 1);
            },
        }),
        {
            name: "currency-storage",
        }
    )
);