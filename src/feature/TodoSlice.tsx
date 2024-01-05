import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addTodo, fetchTodos, updateTodo } from '../../Queries';
import { Todo } from '../models/Todo';
import { TodoStatus } from '../constants/TodoStatus';

interface TodoState {
    todos: Todo[] | null;
    isLoading: boolean;
    error: string | null;
    columns: Columns;
}

interface Columns {
    openColumn: Todo[] | null;
    inProgressColumn: Todo[] | null;
    completedColumn: Todo[] | null;
}

interface MoveTodoAction {
    id: number;
    to: string;
    from: string;
}

interface CreateTodoPayload {
    title: string;
    description: string;
}

interface UpdateTodoStatusPayload {
    id: number;
    status: string;
}

const initialState: TodoState = {
    todos: [],
    isLoading: false,
    error: '',
    columns: {
        openColumn: [],
        inProgressColumn: [],
        completedColumn: [],
    }
}

export const getTodos = createAsyncThunk(
    'todos/fetch',
    async () => {
        const data = await fetchTodos();
        return data
    }
);

export const createTodo = createAsyncThunk(
    'todos/create',
    async ({ title, description }: CreateTodoPayload) => {
        await addTodo(title, description);
        const data = await fetchTodos();
        return data
    }
);

export const updateTodoStatus = createAsyncThunk(
    'todos/updateTodoStatus',
    async ({ status, id }: UpdateTodoStatusPayload) => {
        await updateTodo(status, id);
        const data = await fetchTodos();
        return data
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        moveTodo: (state, action: PayloadAction<MoveTodoAction>) => {
            const from = action.payload.from
            const to = action.payload.to
            const id = action.payload.id
            if (to === TodoStatus.Open) {
                if (from === TodoStatus.In_Progress) {
                    const todo = state.columns.inProgressColumn?.find((todo) => todo.id === id)
                    state.columns.openColumn?.push(todo!)
                    state.columns.inProgressColumn = state.columns.inProgressColumn?.filter((todo) => todo.id !== id) || null
                } else if (from === TodoStatus.Done) {
                    const todo = state.columns.completedColumn?.find((todo) => todo.id === id)
                    state.columns.openColumn?.push(todo!)
                    state.columns.completedColumn = state.columns.completedColumn?.filter((todo) => todo.id !== id) || null
                }
            } else if (to === TodoStatus.In_Progress) {
                if (from === TodoStatus.Open) {
                    const todo = state.columns.openColumn?.find((todo) => todo.id === id)
                    state.columns.inProgressColumn?.push(todo!)
                    state.columns.openColumn = state.columns.openColumn?.filter((todo) => todo.id !== id) || null
                } else if (from === TodoStatus.Done) {
                    const todo = state.columns.completedColumn?.find((todo) => todo.id === id)
                    state.columns.inProgressColumn?.push(todo!)
                    state.columns.completedColumn = state.columns.completedColumn?.filter((todo) => todo.id !== id) || null
                }
            } else if (to === TodoStatus.Done) {
                if (from === TodoStatus.Open) {
                    const todo = state.columns.openColumn?.find((todo) => todo.id === id)
                    state.columns.completedColumn?.push(todo!)
                    state.columns.openColumn = state.columns.openColumn?.filter((todo) => todo.id !== id) || null
                } else if (from === TodoStatus.In_Progress) {
                    const todo = state.columns.inProgressColumn?.find((todo) => todo.id === id)
                    state.columns.completedColumn?.push(todo!)
                    state.columns.inProgressColumn = state.columns.inProgressColumn?.filter((todo) => todo.id !== id) || null
                }
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
                state.columns.openColumn = action.payload?.filter((todo) => todo.status == TodoStatus.Open) || null;
                state.columns.inProgressColumn = action.payload?.filter((todo) => todo.status == TodoStatus.In_Progress) || null;
                state.columns.completedColumn = action.payload?.filter((todo) => todo.status == TodoStatus.Done) || null;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || '';
                state.todos = [];
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
            })
            .addCase(updateTodoStatus.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
                state.columns.openColumn = action.payload?.filter((todo) => todo.status == TodoStatus.Open) || null;
                state.columns.inProgressColumn = action.payload?.filter((todo) => todo.status == TodoStatus.In_Progress) || null;
                state.columns.completedColumn = action.payload?.filter((todo) => todo.status == TodoStatus.Done) || null;
            })
    }
});

export const { moveTodo } = todoSlice.actions

export default todoSlice.reducer