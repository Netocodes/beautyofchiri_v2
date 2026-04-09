"use client";

import { useProfileStore } from "@/app/store/profile";
import { useGetProfile } from "@/lib/tanstackQueries/profile/profile";
import { ReactNode, useEffect } from "react";

export default function ClientHydrate({ children }: { children: ReactNode }) {
    const setUser = useProfileStore((state) => state.setUser);
    const { data, isSuccess } = useGetProfile();

    useEffect(() => {
        // Check localStorage first
        const stored = localStorage.getItem("profile-storage");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                if (parsed?.user) {
                    setUser(parsed.user);
                    return;
                }
            } catch (err) {
                console.error("Failed to parse user:", err);
            }
        }

        // If React Query successfully fetched user, set it
        if (isSuccess && data) {
            setUser(data);
        }
    }, [data, isSuccess, setUser]);

    return children;
}