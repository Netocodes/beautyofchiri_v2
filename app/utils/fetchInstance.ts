import { useRouter } from "next/navigation";
import { useProfileStore } from "../store/profile";
import { ErrorResponse } from "@/lib/types/ErrorResponse";



export const FetchApi = async <T>(
    url: string,
    options: RequestInit = {}
): Promise<T> => {
    const defaultHeaders = {
        "Content-Type": "application/json",
        // Add auth header if needed
        // Authorization: `Bearer ${localStorage.getItem("token")}`
    };

    const res = await fetch(url, {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        body: options.body && typeof options.body !== "string"
            ? JSON.stringify(options.body)
            : options.body,
    });
    if (res.status === 401) {
        console.log(res)
        useProfileStore.getState().clearUser();
        throw new Error('Un-Authorized')
    }


    if (!res.ok) {
        const error = await res.json().catch(() => ({})) as ErrorResponse;
        throw new Error(error.details || "API request failed");
    }

    return res.json();
};