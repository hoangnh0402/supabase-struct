import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Ensure these are defined in your .env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Missing Supabase environment variables");
}

let client: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
    if (!client) {
        client = createClient(supabaseUrl, supabaseKey);
    }
    return client;
};
