const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    Likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blogs" }],
    watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: "Blogs" }],
    isAdmin: { type: Boolean, default: false },
       
},{timestamps:true})

module.exports = mongoose.model("User", userSchema)