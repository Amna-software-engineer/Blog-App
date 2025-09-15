const express=require("express");

const useRouter=express.Router();
const userController=require("../controllers/userController");

useRouter.post("/create-blog",userController.postCreateBlog);
useRouter.get("/blogs",userController.getAllBlogs);
useRouter.post("/comments/:blogId",userController.postAddComment);
useRouter.get("/comments/:blogId",userController.getComments);
useRouter.post("/:blogId/likes",userController.postLikeBlog);
useRouter.post("/:blogId/watchLater",userController.postWatchLater);
useRouter.get("/blogs/:blogId",userController.getSingleBlog);

module.exports=useRouter;