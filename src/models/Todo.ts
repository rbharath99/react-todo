import { Database } from "../../Supabase";

export type Todo = Database['public']['Tables']['todo']['Row']