import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addTodo, fetchTodos } from '../../Queries';
import { Todo } from '../models/Todo';

const initialState: {
    todos: Todo[] | null;
    isLoading: boolean;
    error: string | undefined;
} = {
    todos: [],
    isLoading: false,
    error: '',
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
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTodos.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getTodos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
            })
            .addCase(getTodos.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
                state.todos = [];
            })
            .addCase(createTodo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.todos = action.payload;
            })
    }
});

export default todoSlice.reducer