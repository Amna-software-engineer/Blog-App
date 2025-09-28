const User = require("../models/userModel");
const Blogs = require("../models/blogModel");
const Comments = require("../models/commentsModel");
const fs = require('fs');

// for total users,blogs,comments
exports.getSummery = async (req, res) => {

    try {
        const userCount = await User.countDocuments();
        const blogCount = await Blogs.countDocuments();
        const commentCount = await Comments.countDocuments();
        console.log("all Counts ", userCount, blogCount, commentCount);

        res.status(200).json({ userCount, blogCount, commentCount });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while geting summery"] })
    }
}
exports.getUsers = async (req, res) => {

    try {
        const allUsers = await User.find({}).select("firstName email isAdmin createdAt");
        console.log("allUsers ", allUsers);

        res.status(200).json(allUsers);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching Users"] })
    }
}
exports.deleteUser = async (req, res) => {

    const userId = req.params.userId;
    try {
        const deletedUser = await User.findByIdAndDelete(userId)
        console.log("deletedUser ", deletedUser);

        res.status(200).json({ msg: "Comment deleted successfully", deletedUser });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while deleting User"] })
    }
}
exports.getComments = async (req, res) => {
    try {

        const AllComments = await Comments.find().populate("userId", "firstName").populate("blogId", "title")
        console.log("AllComments ", AllComments);
        res.status(200).json(AllComments);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching Comments"] })
    }
}
exports.deleteComment = async (req, res) => {
    console.log("inside deletedComment");

    const commentId = req.params.commentId;
    try {
        const deletedComment = await Comments.findByIdAndDelete(commentId);
        console.log("deletedComment ", deletedComment);

        res.status(200).json({ msg: "User deleted successfully", deletedUser });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while deleting Comment"] })
    }
}
exports.getBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blogs.find();
        console.log("AllBlogs ", AllBlogs);

        res.status(200).json(AllBlogs);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching blogs"] })
    }

}
exports.deleteBlog = async (req, res) => {

    const blogId = req.params.blogId;
    console.log("blogid ", blogId);

    try {
        const deletedBlog = await Blogs.findByIdAndDelete(blogId);
        console.log("deletedBlog ", deletedBlog);

        res.status(200).json({ msg: "Blog deleted successfully", deletedBlog });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while deleting blog"] })
    }
}
exports.createBlog = async (req, res) => {
    console.log("req.file ", req.file);
    console.log("req.body ", req.body);
    const image = req.file && req.file.path;

    const { title, description } = req.body;

    try {
        const newBlog = new Blogs({ title, image, description });
        await newBlog.save();

        res.status(200).json({ msg: "Blog created successfully", newBlog });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while creating blog"] })
    }
}
exports.getEditBlog = async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({ errs: ["Blog not found"] })
        }
        res.status(200).json({ msg: "Blog featched successfully", blog });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching blog"] })
    }

}

exports.editBlog = async (req, res) => {
    const blogId = req.params.blogId;
    const { title, description } = req.body;
    console.log("req.file ", req.file);
    console.log("req.body ", req.body);
    const image = req.file && req.file.path;
    try {
        const blog = await Blogs.findById(blogId);
        console.log("blog ", blog);
        blog.title = title;
        blog.description = description;
        if (req.file && req.file.path) {
            fs.unlink(blog.image,(err)=>{
                if(err){
                    console.log("err while deleting old image ",err);
                }   
            });
            blog.image = image;
        }
        blog.image = image 
        await blog.save();
        console.log("updatedBlog ", blog);

        res.status(200).json({ msg: "Blog Updated successfully", blog });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while updating blog"] })
    }
}


