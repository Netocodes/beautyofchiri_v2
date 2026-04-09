"use client";

import { useProfileStore } from "@/app/store/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useProfileStore((state) => state.user);
    const router = useRouter();

    useEffect(() => {
        if (user === null) {
            router.replace("/login");
        }
    }, [user, router]);


    if (user === undefined) return <div>Loading... pr</div>; // hydration phase

    if (!user) return null; // or loader

    return <>{children}</>;
}