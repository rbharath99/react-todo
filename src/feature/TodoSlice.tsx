import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { addTodo, fetchTodos } from '../../Queries';
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
    to: TodoStatus;
}

interface CreateTodoPayload {
    title: string;
    description: string;
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

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        moveTodo: (state, action: PayloadAction<MoveTodoAction>) => {
            const to = action.payload.to
            if (to === TodoStatus.In_Progress) {
                const todo = state.columns.openColumn?.find((todo) => todo.id === action.payload.id)
                state.columns.inProgressColumn?.push(todo!)
                state.columns.openColumn = state.columns.openColumn?.filter((todo) => todo.id !== action.payload.id) || null
            }
            if (to === TodoStatus.Done) {
                const todo = state.columns.inProgressColumn?.find((todo) => todo.id === action.payload.id)
                state.columns.completedColumn?.push(todo!)
                state.columns.inProgressColumn = state.columns.inProgressColumn?.filter((todo) => todo.id !== action.payload.id) || null
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