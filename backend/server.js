// external modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const mutler = require("multer");
// local modules
const authRouter = require("./routers/authRouter");
const userRouter = require("./routers/userRouter");
const cookieParser = require("cookie-parser");
const adminRouter = require("./routers/adminRouter");
const { isAdmin } = require("./middleware/isAdmin");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;
dotenv.config() 
const DB_URL=process.env.MONGODB_URL
const rootDir =path.dirname(require.main.filename)

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const uplaod = multer({storage})
app.use(express.static(path.join(rootDir, 'uploads')))
app.use("/uploads",express.static(path.join(rootDir, 'uploads')))
app.use(express.urlencoded({ extended: true }));// to parse form data
app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173",  //  Frontend URL
  credentials: true                 //  Required for cookies
}));

app.use("/admin/blogs",uplaod.single("image"));
app.use(authRouter);
app.use(userRouter);
app.use("/admin",adminRouter);



mongoose.connect(DB_URL).then(()=>{
    console.log("connected to mongodb successfully ");
    
     app.listen(PORT, () => {
        console.log(`server running at PORT ${PORT}`);
    })
}).catch(err=>{
    console.log("err while connecting to db ",err);
    
})

