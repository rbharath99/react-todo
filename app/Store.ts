import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../src/feature/TodoSlice'
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>
