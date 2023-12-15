import { supabase } from "./SupabaseApi"

export const fetchTodos = async () => {
    let { data: todos } = await supabase.from('todo').select()
    return todos
}

export const addTodo = async (title: string, description: string): Promise<void> => {
    await supabase.from('todo').insert({ title: title, description: description })
}