import { createClient } from "@supabase/supabase-js";
import { VITE_SUPABASE_URL, VITE_SUPABASE_KEY } from "./constants";
import { Database } from './Supabase'

export const supabase = createClient<Database>(VITE_SUPABASE_URL, VITE_SUPABASE_KEY);