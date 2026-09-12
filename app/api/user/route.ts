import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/client";

export async function GET() {
    const supabase = await createClient();

    // 🔐 get auth user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "The user is not authorized." }, { status: 401 });
    }
    console.log(user)
    // 📦 get profile
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
    console.log(profile)
    if (error) {
        return NextResponse.json(
            { error: "Profile not found", details: error.details, hint: error.hint, message: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        user: profile,
        message: "Profile retrieved successfully",
    },
        { status: 200 }
    );
}