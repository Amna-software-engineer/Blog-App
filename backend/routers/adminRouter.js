import express from "express";
// import * as adminController from "../controllers/adminController.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { isAdmin } from "../middleware/isAdmin.js";
import {createBlog, deleteBlog, deleteComment, deleteUser, editBlog, getBlogs, getComments, getEditBlog, getSummery, getUsers} from "../controllers/adminController.js"
const adminRouter = express.Router();

adminRouter.get("/summery", verifyToken, isAdmin, getSummery);
adminRouter.get("/users", verifyToken, isAdmin, getUsers);
adminRouter.delete("/users/:userId", verifyToken, isAdmin, deleteUser);
adminRouter.get("/comments", verifyToken, isAdmin, getComments);
adminRouter.delete("/comments/:commentId", verifyToken, isAdmin, deleteComment);
adminRouter.get("/blogs", verifyToken, isAdmin, getBlogs);
adminRouter.delete("/blogs/:blogId", verifyToken, isAdmin, deleteBlog);
adminRouter.post("/blogs", verifyToken, isAdmin, createBlog);
adminRouter.get("/blogs/:blogId", verifyToken, isAdmin, getEditBlog);
adminRouter.patch("/blogs/:blogId", verifyToken, isAdmin, editBlog);






export default adminRouter;