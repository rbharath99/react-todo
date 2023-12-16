import { supabase } from "./SupabaseApi"
import { Todo } from "./src/models/Todo"

export const fetchTodos = async (): Promise<Todo[]> => {
    let { data: todos } = await supabase.from('todo').select('*')
    return todos as Todo[]
}

export const addTodo = async (title: string, description: string): Promise<void> => {
    await supabase.from('todo').insert({ title: title, description: description })
}