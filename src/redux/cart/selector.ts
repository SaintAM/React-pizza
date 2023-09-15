import { RootState } from "../store";

// RootState получили из store.ts
export const selectCart = (state: RootState) => state.cart;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cart.items.find((obj) => obj.id === id);
