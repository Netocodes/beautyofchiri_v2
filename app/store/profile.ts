import { create } from "zustand";
import { profile } from "@/lib/types/profileType";
import { createJSONStorage, persist } from "zustand/middleware";
import { PersistStorage } from "zustand/middleware";

type ProfileStore = {
    user: profile | null;

    setUser: (user: profile) => void;
    clearUser: () => void;

};

export const useProfileStore = create<ProfileStore>()(
    persist(
        (set) => ({
            user: null as profile | null,

            setUser: (user: profile) => set({ user }),

            clearUser: () => set({ user: null }),
        }),
        {
            name: "profile-storage", // key in storage
            storage: createJSONStorage(() => localStorage)
        }
    )
);