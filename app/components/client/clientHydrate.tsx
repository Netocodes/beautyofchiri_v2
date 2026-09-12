"use client";

import { useGetProfile } from "@/lib/tanstackQueries/profile/profile";
import { ReactNode, useEffect } from "react";

export default function ClientHydrate({ children }: { children: ReactNode }) {
    // const setUser = useProfileStore((state) => state.setUser);
    const { data, isSuccess } = useGetProfile();
    console.log(data)



    return children;
}