import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addTodo, fetchTodos } from '../../Queries';
import { Todo } from '../models/Todo';
import { TodoStatus } from '../constants/TodoStatus';

interface TodoState {
    todos: Todo[] | null;
    isLoading: boolean;
    error: string | null;
    columns: {
        openColumn: Todo[] | null;
        inProgressColumn: Todo[] | null;
        completedColumn: Todo[] | null;
    }
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
    async ({ title, description }: { title: string; description: string }) => {
        await addTodo(title, description);
        const data = await fetchTodos();
        return data
    }
);

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        moveTodo: (state, action: PayloadAction<{ id: number, to: TodoStatus }>) => {
            const todo = state.todos?.find((todo) => todo.id === action.payload.id)
            const to = action.payload.to
            state.todos = state.todos?.filter((todo) => todo.id !== action.payload.id) || null
            if (to == TodoStatus.Open) {
                state.columns.openColumn?.push(todo!)
            } else if (to === TodoStatus.In_Progress) {
                state.columns.inProgressColumn?.push(todo!)
            } else if (to === TodoStatus.Done) {
                state.columns.completedColumn?.push(todo!)
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
                state.columns.openColumn = action.payload
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
    }
});

export const { moveTodo } = todoSlice.actions

export default todoSlice.reducer