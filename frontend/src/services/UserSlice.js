import { createSlice } from "@reduxjs/toolkit";
const savedBlog = localStorage.getItem("blogs")
const BlogSlice = createSlice({
    name: "blogSlice",
    // initialState: { blogs:  savedBlog ?  savedBlog : [] },
    initialState: { blogs: savedBlog && savedBlog !== "undefined" ?  JSON.parse(savedBlog) : [] },
    reducers: {
        saveBlogstoStore: (state, action) => {
            console.log("state.blogs in slice ",state.blogs);
            state.blogs = action.payload;                  
        }
    }
})

export default BlogSlice.reducer;
export const { saveBlogstoStore } = BlogSlice.actions;