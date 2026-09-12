import { ErrorResponse } from "@/lib/types/ErrorResponse";

// Custom error to specifically identify 401 Unauthorized responses
export class UnauthorizedError extends Error {
    constructor(message: string = "Unauthorized") {
        super(message);
        this.name = "UnauthorizedError";
    }
}

export const FetchApi = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    try {
        const defaultHeaders = {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${localStorage.getItem("token")}`
        };

        const res = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
            next: { revalidate: 60 },
            body: options.body && typeof options.body !== "string"
                ? JSON.stringify(options.body)
                : options.body,
        });

        if (!res.ok) {
            const error = await res.json().catch(() => ({})) as ErrorResponse;

            // Handle 401 explicitly
            if (res.status === 401) {
                // throw new UnauthorizedError(error.details ?? "Session expired or unauthorized");
                console.log("Unauthorized access detected. Returning null for 401 errors.");
                return null as unknown as T; // Return null for 401 errors
            }

            throw new Error(error.details ?? "API request failed");
        }

        return res.json();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // Re-throw instance of UnauthorizedError directly
        if (error instanceof UnauthorizedError) {
            throw error;
        }

        console.error(error);
        throw new Error(error.message ?? "API request failed");
    }
};