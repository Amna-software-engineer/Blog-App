import { baseApi } from "./Api";

export const injectedBlogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({ query: () => "/blogs" }),
        addComment: builder.mutation({
            query: (commentData,blogId) => (
                {
                    url: `/comments/${blogId}`,
                    method: "POST",
                    body: commentData
                }
            )
        }),
        getComments: builder.query({
            query: (blogId) => ({ url: `/comments/${blogId}` })
        })
    })
})



export const { useGetBlogsQuery, useAddCommentMutation, useGetCommentsQuery } = baseApi;