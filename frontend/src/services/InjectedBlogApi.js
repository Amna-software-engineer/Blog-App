import { baseApi } from "./Api";

export const injectedBlogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "/blogs",
            providesTags: ["Blogs"]
        }),
        getSingleBlog: builder.query({
            query: (blogId) => `/blogs/${blogId}`,
            providesTags: ["single Blog"]
        }),
        getComments: builder.query({
            query: (blogId) => ({ url: `/comments/${blogId}` }),
            providesTags: (result, error, blogId) => [{ type: "Comments", id: blogId }],

        }),
        addComment: builder.mutation({
            query: ( {commentData, blogId}) => ({
                url: `/comments/${blogId}`,
                method: "POST",
                body: commentData,
            }),
            invalidatesTags: (result, error,  {blogId}) => [
                { type: "Comments", id: blogId },
                { type: "single Blog" },
            ],
        }),

        likeBlog: builder.mutation({
            query: ({ blogId, userId }) => ({
                url: `/${blogId}/likes`,
                method: "POST",
                body: { blogId, userId },
            }),
            invalidatesTags: ["single Blog"]
        })

    })
})



export const { useGetBlogsQuery, useAddCommentMutation, useGetCommentsQuery, useLikeBlogMutation, useGetSingleBlogQuery } = injectedBlogApi;