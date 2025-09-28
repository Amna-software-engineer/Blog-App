import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { jwtDecode } from "jwt-decode";


const rawBaseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:3000",
    credentials: "include",
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

export const customBaseQuery = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions)//1st run query
    if (result.error && result.error.status === 401) {
        // accestoken expired
        const refreshtoken = localStorage.getItem("refreshToken");
        const refreshDecoded = jwtDecode(refreshtoken);
        if (refreshtoken && Date.now() / 1000 < refreshDecoded.exp) {
            const refreshResponse = await fetch("http://localhost:3000/refresh-token", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ refreshtoken })
            })

            if (refreshResponse.ok) {
                const data = await refreshResponse.json();
                console.log("refreshResponse", data);
                localStorage.setItem("accessToken", data.accessToken)

                result = await rawBaseQuery( args, api, extraOptions) //again run query
            }
        } else {//refresh token expired or doesnot exist
            localStorage.clear();
            window.location.href = "/login"
        }
    }

    return result
}

export const baseApi = createApi({
    tagTypes: ["Blogs", "Comments", "single Blog", "Users", "Summery"],
    baseQuery: customBaseQuery,
    endpoints: () => ({})
})