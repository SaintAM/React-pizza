// type - типизирует что угодно
export type CartItem = {
    id: string;
    title: string;
    type: string;
    price: number;
    size: number;
    count: number;
    imageUrl: string;
};
// interface -типизирует только объект
export interface cartSliceState {
    totalPrice: number;
    items: CartItem[];
}
