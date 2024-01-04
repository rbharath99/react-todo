import { supabase } from "./SupabaseApi"
import { Todo } from "./src/models/Todo"

export const fetchTodos = async (): Promise<Todo[] | null> => {
    const { data: todo } = await supabase.from('todo').select('*').returns<Todo[] | null>()
    return todo
}

export const addTodo = async (title: string, description: string): Promise<void> => {
    await supabase.from('todo').insert({ title: title, description: description, is_complete: false })
}