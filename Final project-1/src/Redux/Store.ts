import { configureStore } from "@reduxjs/toolkit";
import AddToCartReducer from "./AddToCartSlice";
import CategoriesReducer from "./CategoriesSlice";


export const store = configureStore({

    reducer: {

        AddToCartReducer,
        CategoriesReducer

    }


})

export type RootState=ReturnType<typeof store.getState>;