import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { FilterSliceState, Sort, SortPropertyEnum } from "./types";

const initialState: FilterSliceState = {
    searchValue: "",
    categoryId: 0,
    currentPage: 1,
    sort: {
        name: "популярности",
        sortProperty: SortPropertyEnum.RATING_DESK,
    },
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        // setCategoryId вызовется, она получит свое состояние (state)
        // В (actions.payload) будет хранится значение, которые мы передаем из другого места кода через dispath
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.sort = action.payload.sort;
                state.categoryId = Number(action.payload.categoryId);
                state.currentPage = Number(action.payload.currentPage);
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: "популярности",
                    sortProperty: SortPropertyEnum.RATING_DESK,
                };
            }
        },
    },
});

export const {
    setCategoryId,
    setSort,
    setCurrentPage,
    setFilters,
    setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
