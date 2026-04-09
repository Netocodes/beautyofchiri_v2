import { createClient } from "@supabase/supabase-js";

export const BocAdmin = createClient(process.env.NEXT_PUBLIC_DATABASE_URL!, process.env.SECRET_ROLE_KEY!)
