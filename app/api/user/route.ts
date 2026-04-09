import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createClient();

    // 🔐 get auth user
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.json({ error: "No user Found" }, { status: 401 });
    }

    // 📦 get profile
    const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        return NextResponse.json(
            { error: "Profile not found", details: error.details, hint: error.hint, message: error.message },
            { status: 400 }
        );
    }

    return NextResponse.json({
        user: profile,
        message: "Got your account"
    },
        { status: 200 }
    );
}