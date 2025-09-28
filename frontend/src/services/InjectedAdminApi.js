import { baseApi } from "./Api";

export const InjectedAdminApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        getSummery: builder.query({
            query: (token) => ({
                url: "/admin/summery",
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            }),
            providesTags: ["Summery"]
        }),
        getUser: builder.query(
            {
                query: (token) => ({
                    url: "/admin/users",
                    // headers: {
                    //     Authorization: `Bearer ${token}`
                    // }
                }),
                providesTags: ["Users"]
            }
        ),
        deleteUser: builder.mutation({
            query: ({ userId, accessToken }) => ({
                url: `/admin/users/${userId}`,
                method: 'DELETE',
                // headers: {
                //     Authorization: `Bearer ${accessToken}`
                // }
            }),
            invalidatesTags: ["Users"]
        }),
        getAllComments: builder.query({
            query: (token) => ({
                url: "/admin/comments",
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            }),
            providesTags: ["Comments"]
        }),
        deleteComment: builder.mutation({
            query: ({ commentId }) => ({
                url: `/admin/comments/${commentId}`,
                method: 'DELETE',
                // headers: {
                //     Authorization: `Bearer ${accessToken}`
                // }
            }),
            invalidatesTags: ["Comments"]
        }),
        getBlogs: builder.query({
            query: (token) => ({
                url: "/admin/blogs",
                // headers: {
                //     Authorization: `Bearer ${token}`
                // }
            }),
            providesTags: ["Blogs"]
        }),
        getSingleBlog: builder.query({
            query: (blogId) => ({
                url: `/admin/blogs/${blogId}`,
                // headers: {
                //     Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                // }
            }),
            invalidatesTags: ["Comments"]
        }),
        deleteBlog: builder.mutation({
            query: ({ blogId, accessToken }) => ({
                url: `/admin/blogs/${blogId}`,
                method: 'DELETE',
                // headers: {
                //     Authorization: `Bearer ${accessToken}`
                // }
            }),
            invalidatesTags: ["Blogs"]
        }),
        createBlog: builder.mutation({
            query: ({ form }) => ({
                url: '/admin/blogs',
                method: 'POST',
                // headers: {
                //     headers: { "Content-Type": "multipart/form-data" }
                // },
                body: form,
            }),
            invalidatesTags: ["Blogs"]
        }),
        EditBlog: builder.mutation({
            query: ({ form, blogId }) => ({
                url: `/admin/blogs/${blogId}`,
                method: 'PATCH',
                // headers: {
                //     headers: { "Content-Type": "multipart/form-data" }
                // },
                body: form,
            }),
            invalidatesTags: ["Blogs"]
        }),

    }),


})

export const { useGetUserQuery, useGetAllCommentsQuery, useDeleteUserMutation, useGetBlogsQuery, useDeleteCommentMutation, useGetSummeryQuery, useDeleteBlogMutation, useCreateBlogMutation, useGetSingleBlogQuery, useEditBlogMutation } = baseApi;