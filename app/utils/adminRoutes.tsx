"use client";

import { useProfileStore } from "@/app/store/profile";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminRoute({
    children,
}: {
    children: React.ReactNode;
}) {
    const user = useProfileStore((state) => state.user);
    const router = useRouter();

    console.log(user)
    useEffect(() => {
        if (!user) {
            router.replace("/login");
        } else if (user.role !== "admin") {
            console.log('kicked a user out')
            router.replace("/"); // block non-admins
        }
    }, [user, router]);

    if (!user || user.role !== "admin") return null;

    return <>{children}</>;
}