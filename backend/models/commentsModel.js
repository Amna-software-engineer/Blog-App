import mongoose from "mongoose";

const commentSchema =new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
    content: { type: String, required: true },
},{timestamps:true})//automaticaly add createdAt,updatedAt fields

export default mongoose.model("Comments",commentSchema);