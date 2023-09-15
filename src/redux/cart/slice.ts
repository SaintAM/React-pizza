import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CartItem, cartSliceState } from "./types";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const { items, totalPrice } = getCartFromLS();

const initialState: cartSliceState = {
    totalPrice,
    items,
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        // PayloadAction это типизация createSlice из документ., payload: <CartItem>
        addItem(state, action: PayloadAction<CartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id
            );

            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );

            if (findItem) {
                findItem.count--;
            }

            state.totalPrice = calcTotalPrice(state.items);
        },

        removeItem(state, action: PayloadAction<string>) {
            state.items = state.items.filter(
                (obj) => obj.id !== action.payload
            );
            state.totalPrice = calcTotalPrice(state.items);
        },

        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const { addItem, removeItem, minusItem, clearItems } = cartSlice.actions;
export default cartSlice.reducer;
