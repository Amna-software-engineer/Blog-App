import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";




export const baseApi = createApi({
    tagTypes: ["Blogs", "Comments", "single Blog"],
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000", credentials: "include"
    }),
    endpoints: () => ({})
})