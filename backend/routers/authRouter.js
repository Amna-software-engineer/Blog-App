import express from "express";
// import * as authController from "../controllers/authController.js";
import {postForgetPassword, postLogin, postRefreshToken, postResetPassword, postSignup} from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/login", postLogin);
authRouter.post("/signup", postSignup);
authRouter.post("/forget-password",  postForgetPassword);
authRouter.post("/reset-password/:id/:token",  postResetPassword);
authRouter.post("/refresh-token",  postRefreshToken);

export default authRouter;