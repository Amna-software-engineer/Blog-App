import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/Api";
import BlogSlice from "../services/UserSlice"

export const store = configureStore({
    reducer: {
        app: BlogSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), baseApi.middleware,

    ],
})