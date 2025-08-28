// external modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
// local modules
const authRouter = require("./routers/authRouter");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 3000;
const DB_URL=process.env.MONGODB_URL
dotenv.config() 

app.use(express.urlencoded({ extended: true }));// to parse form data
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  //  Frontend URL
  credentials: true                 //  Required for cookies
}));
app.use(cookieParser()); //  Required to read cookies from req.cookies
app.use(authRouter);

// app.use(cors());//allow from all origins/domains/urls

mongoose.connect("mongodb+srv://admin:admin@blog-app.mmaqnfj.mongodb.net/blog-app").then(()=>{
    console.log("connected to mongodb successfully");
    
     app.listen(PORT, () => {
        console.log(`server running at PORT ${PORT}`);
    })
}).catch(err=>{
    console.log("err while connecting to db ",err);
    
})

// mongodb+srv://admin:admin@blog-app.mmaqnfj.mongodb.net/