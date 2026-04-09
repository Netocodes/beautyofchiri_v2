import { useRouter } from "next/navigation";
import { useProfileStore } from "../store/profile";



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
        body: options.body && typeof options.body !== "string"
            ? JSON.stringify(options.body)
            : options.body,
    });
    if (res.status === 401) {
        useProfileStore.getState().clearUser();
        throw new Error('Un-Authorized')
    }

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "API request failed");
    }

    return res.json();
};