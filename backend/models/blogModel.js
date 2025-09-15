const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    Likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
})

module.exports = mongoose.model("Blogs", blogSchema);