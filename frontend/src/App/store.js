import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../services/Api";
import BlogSlice from "../services/UserSlice"
import AdminSlice from "../services/AdminSlice"

export const store = configureStore({
    reducer: {
        blog: BlogSlice,
        admin: AdminSlice,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(), baseApi.middleware,

    ],
})