import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, SearchPizzaParams } from "./types";

// Это асинхронный экшен fetchPizzas, он получает через axios наши данные с бэка
export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
    "pizza/fetchPizzasStatus",
    // Типизируем createAsyncThunk
    async (params) => {
        const { order, sortBy, category, search, currentPage } = params;
        // Типизируем axios
        const { data } = await axios.get<Pizza[]>(
            `https://64861b03a795d24810b7b7ef.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
        );
        return data as Pizza[];
    }
);
