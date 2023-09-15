// Эти типы получают с БЭКА черех хром(ссылка), но она у нас была в pizzaBlock
export type Pizza = {
	id: string;
	title: string;
	imageUrl: string;
	types: number[];
	sizes: number[];
	price: number;
	rating: number;
};

export enum Status {
	LOADING = "loading",
	SUCCESS = "success",
	ERROR = "error",
}

// Типизиация initialState
export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}
// типизация параметров в fetchPizzas, Если мы указываем Record<> значит все
// параметры будут с типом, указанным в <> то есть ключ: string, значение: string
// { order, sortBy, category, search, currentPage } - эти значения теперь string
// type FetchPizzasArgs = Record<string, string>;

// Типизация параметров, которые пришли с Бэка через асинхронный экшен
export type SearchPizzaParams = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};