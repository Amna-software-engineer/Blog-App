import { createSlice } from "@reduxjs/toolkit";

const BlogSlice = createSlice({
    name: "blogSlice",
    initialState: { blogs: JSON.parse(localStorage.getItem("blogs")) || [] },
    reducers: {
        saveBlogstoStore: (state, action) => {
            state.blogs = action.payload;
        }
    }
})

export default BlogSlice.reducer;
export const { saveBlogstoStore } = BlogSlice.actions;