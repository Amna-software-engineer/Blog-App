const express=require("express");

const authRouter=express.Router();
const authController=require("../controllers/authController");

authRouter.post("/login",authController.postLogin);
authRouter.post("/signup",authController.postSignup);
authRouter.post("/forget-password",authController.postForgetPassword);
authRouter.post("/reset-password/:id/:token",authController.postResetPassword);
authRouter.post("/refresh-token",authController.postRefreshToken);




module.exports=authRouter;