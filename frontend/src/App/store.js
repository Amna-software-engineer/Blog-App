import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/Api";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), baseApi.middleware,

    ],
})