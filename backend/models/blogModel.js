const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    Likes:{type:Number,default:0},
})

module.exports = mongoose.model("Blogs", blogSchema)