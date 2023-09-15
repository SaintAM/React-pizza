import { configureStore } from "@reduxjs/toolkit";
import filter from "./filter/slice";
import cart from "./cart/slice";
import pizza from "./pizza/slice";
import { useDispatch } from "react-redux";

export const store = configureStore({
    reducer: {
        filter,
        cart,
        pizza,
    },
});
// (взяли из докум.) этот type ВСЕГО state
export type RootState = ReturnType<typeof store.getState>;

// типизируем dispatch (взяли из докум.)
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
