import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import authRouter from "./routers/authRouter.js";
import userRouter from "./routers/userRouter.js";
import cookieParser from "cookie-parser";
import adminRouter from "./routers/adminRouter.js";
import { isAdmin } from "./middleware/isAdmin.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;
dotenv.config()
const DB_URL = process.env.MONGODB_URL;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const uplaod = multer({ storage })
app.use(express.static(path.join(__dirname, 'uploads')))
app.use("/uploads", express.static(path.join(__dirname, 'uploads')))
app.use(express.urlencoded({ extended: true }));// to parse form data
app.use(express.json())
app.use(cors({
    origin: "https://blog-app-one-gamma-53.vercel.app",  //  Frontend URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true                 //  Required for cookies
}));

app.use("/admin/blogs", uplaod.single("image"));
app.use(authRouter);
app.use(userRouter);
app.use("/admin", adminRouter);


const ConnectDb = async () => {
    try {
        const connection = await mongoose.connect(
            DB_URL,
        );

        if (connection.connection) {
            console.log("Database Connected Successfully!");
        }
    } catch (error) {
        console.log("Something went wronge while connecting DB");
    }
};
await ConnectDb();
export default app;


