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
dotenv.config() 
const DB_URL=process.env.MONGODB_URL

app.use(express.urlencoded({ extended: true }));// to parse form data
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  //  Frontend URL
  credentials: true                 //  Required for cookies
}));
app.use(authRouter);


mongoose.connect(DB_URL).then(()=>{
    console.log("connected to mongodb successfully ");
    
     app.listen(PORT, () => {
        console.log(`server running at PORT ${PORT}`);
    })
}).catch(err=>{
    console.log("err while connecting to db ",err);
    
})

