const express=require("express");

const adminRouter=express.Router();
const adminController=require("../controllers/adminController");
const { verifyToken } = require("../middleware/verifyToken");
const { isAdmin } = require("../middleware/isAdmin");
// const { isAdmin } = require("../middleware/isAdmin");

adminRouter.get("/summery",verifyToken,isAdmin,adminController.getSummery);
adminRouter.get("/users",verifyToken,isAdmin,adminController.getUsers);
adminRouter.delete("/users/:userId",verifyToken,isAdmin,adminController.deleteUser);
adminRouter.get("/comments",verifyToken,isAdmin,adminController.getComments);
adminRouter.delete("/comments/:commentId",verifyToken,isAdmin,adminController.deleteComment);
adminRouter.get("/blogs",verifyToken,isAdmin,adminController.getBlogs);
adminRouter.delete("/blogs/:blogId",verifyToken,isAdmin,adminController.deleteBlog);
adminRouter.post("/blogs",verifyToken,isAdmin,adminController.createBlog);
adminRouter.get("/blogs/:blogId",verifyToken,isAdmin,adminController.getEditBlog);
adminRouter.patch("/blogs/:blogId",verifyToken,isAdmin,adminController.editBlog);






module.exports=adminRouter;