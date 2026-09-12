"use client";

import { useGetProfile } from "@/lib/tanstackQueries/profile/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: user, isLoading, isError } = useGetProfile();
    const router = useRouter();

    useEffect(() => {
        // 1. Wait until loading finishes before making redirect decisions
        if (isLoading) return;

        // 2. If unauthenticated or fetch failed -> Login
        if (isError || !user?.user) {
            router.replace("/login");
            return;
        }

        // 3. If authenticated but wrong role -> Home
        if (user.user.role !== "admin") {
            router.replace("/");
        }
    }, [user, isLoading, isError, router]);

    // Show a blank/loading screen while checking auth
    if (isLoading) {
        return (
            <div className="flex h-screen items-center justify-center">
                <p>Verifying access...</p>
            </div>
        );
    }

    // Prevent flash of protected content prior to redirect
    if (!user || user.user.role !== "admin") {
        return null;
    }

    return <>{children}</>;
}