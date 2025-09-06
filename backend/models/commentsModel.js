const mongoose = require("mongoose");

const commentSchema =new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blogs" },
    CreatedAt: { type: Date, default: Date.now },
    comment: { type: String, required: true },
})

module.exports=mongoose.model("Comments",commentSchema);