import { createSlice } from "@reduxjs/toolkit";
const savedUsers = localStorage.getItem("users");
const savedComments = localStorage.getItem("comments");
const savedBlogs = localStorage.getItem("blogs");
const AdminSlice = createSlice({
    name: "AdminSlice",
    initialState: { users: savedUsers && savedUsers !== "undefined" ?  JSON.parse(savedUsers) : [], comments: savedComments && savedComments !== "undefined" ?  JSON.parse(savedComments) : [],blogs: savedBlogs && savedBlogs !== "undefined" ?  JSON.parse(savedBlogs) : []},
    reducers: {
        saveUserstoStore: (state, action) => {
            // console.log("state.users in slice ",state.users);
            state.users= action.payload;                  
        },
        saveCommentstoStore: (state, action) => {
            // console.log("state.users in slice ",state.users);
            state.comments= action.payload; 
        },
        saveBlogstoStore: (state, action) => {
            // console.log("state.users in slice ",state.users);
            state.blogs= action.payload;                  
        }
    }
})

export default AdminSlice.reducer;
export const { saveUserstoStore,saveCommentstoStore,saveBlogstoStore } = AdminSlice.actions;