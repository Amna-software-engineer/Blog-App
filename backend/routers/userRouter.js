import express from "express";
// import userController from "../controllers/userController.js";
import {getAllBlogs, getComments, getSingleBlog, postAddComment, postCreateBlog, postLikeBlog, postWatchLater} from "../controllers/userController.js";

const useRouter = express.Router();

useRouter.post("/create-blog", postCreateBlog);
useRouter.get("/blogs", getAllBlogs);
useRouter.post("/comments/:blogId", postAddComment);
useRouter.get("/comments/:blogId", getComments);
useRouter.post("/:blogId/likes", postLikeBlog);
useRouter.post("/:blogId/watchLater", postWatchLater);
useRouter.get("/blogs/:blogId", getSingleBlog);

export default useRouter;