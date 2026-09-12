import { createClient } from "@/lib/supabase/client";
export const GET = async () => {
    try {
        const supabase = await createClient();

        const { error } = await supabase.auth.signOut();

        if (error) {
            console.log(error)
            return new Response(JSON.stringify({ message: "Error occurred while logging out" }), {
                status: 400
            });
        }

        return new Response(JSON.stringify({ message: "User logged out successfully" }), {
            status: 200
        });

    } catch (error) {
        return new Response(JSON.stringify({ errorMessage: "An unexpected catch error occurred", error: error }), {
            status: 500
        });
    }
};