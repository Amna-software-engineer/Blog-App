import { baseApi } from "./Api";

export const injectedUserApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
          
        createUser: builder.mutation( //query for get req mutation for other reqs
            {
                query: (user) => ({
                    url: "/signup",
                    method: "POST",
                    body: user
                })
            }),

        userLogin: builder.mutation({
            query: (userDate) => ({
                url: "/login",
                method: "POST",
                body: userDate,
            })
        }),

        forgetPassord: builder.mutation({
            query: (email) => ({
                url: "/forget-password",
                method: "POST",
                body: email
            })
        }),
        resetPassword: builder.mutation({
            query: ({ userData, id, token }) => ({
                url: `/reset-password/${id}/${token}`,
                method: "POST",
                body: userData
            })
        }),
        refreshToken: builder.mutation({
            query: (refreshtoken) => ({
                url:'/refresh-token',
                method: "POST",
                body: {refreshtoken}
            })
        }),
      
    }),


})

export const { useCreateUserMutation, useForgetPassordMutation, useResetPasswordMutation, useUserLoginMutation, useRefreshTokenMutation } = baseApi;