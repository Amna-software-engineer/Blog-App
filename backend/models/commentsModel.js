const mongoose = require("mongoose");

const commentSchema =new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
    content: { type: String, required: true },
},{timestamps:true})//automaticaly add createdAt,updatedAt fields

module.exports=mongoose.model("Comments",commentSchema);