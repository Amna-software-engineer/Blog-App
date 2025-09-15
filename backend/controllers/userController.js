const Blogs = require("../models/blogModel");
const User = require("../models/userModel");
const Comments = require("../models/commentsModel");
// create blog controller
exports.postCreateBlog = async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const Newblog = await Blogs.create({ title, description, image });
        console.log("Newblog", Newblog);
        res.status(200).json({ msg: "blog created successfully", Newblog })
    } catch (error) {
        console.log("Error ", error);
        res.status(400).json({ errs: ["Error while creating blogs"] })
    }

}
//getAllBlogs controller
exports.getAllBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blogs.find();
        console.log("AllBlogs ", AllBlogs);
        
        res.status(200).json(AllBlogs);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching blogs"] })
    }

}
//postAddComment controller
exports.postAddComment = async (req, res) => {
    console.log("reqbody", req.body);
    const { blogId, userId, createdAt, commentBody } = req.body;

    const user = await User.findById(userId);
    const blog = await Blogs.findById(blogId);
    if (user && blog) {
        try {
            const newComment = new Comments({ blogId, userId, createdAt, comment: commentBody });
                const addedComent = await newComment.save();
                console.log("addedComent ", addedComent);
                res.status(200).json({ msg: "comment added successfully", newComment })

            } catch (error) {
                console.log("Error ", error);
                res.status(400).json({ errs: ["Error while adding comment"] })
            }
        } else {
            res.status(404).json({ errs: ["User or blog does not found"] })

        }
    }
    // getComments controller
    exports.getComments = async (req, res) => {
        const blogId = req.params.blogId;
        try {
            const AllComments = await Comments.find({ blogId }).populate("userId", "firstName email")
            console.log("AllComments ", AllComments);
            res.status(200).json(AllComments);
        } catch (error) {
            console.log("error ", error);
            res.status(400).json({ errs: ["Error while fetching blogs"] })
        }
    }
    // getSingleBlog controller
    exports.getSingleBlog = async (req, res) => {
        const blogId = req.params.blogId;
        try {
            const blog = await Blogs.findById(blogId);
            if(!blog){
                return res.status(404).json({ errs: ["Blog not found"] })
            }
            console.log("single blog ", blog);
            res.status(200).json({msg:"Blog fetched successfully", blog, });
        } catch (error) {
            console.log("error ", error);
            res.status(400).json({ errs: ["Error while fetching blog"] })
        }
    }
    exports.postLikeBlog = async (req, res) => {
        const userId=req.body?.userId;
        const blogId=req.body?.blogId;
        console.log("userid ",userId,"blogid ",blogId); 
   console.log("req.body",req.body);
           try {
           const user=await User.findById(userId);
           console.log("user ", user);
           if(!user){
            return res.status(404).json({ errs: ["User not found"] })
           }
           const blog=await Blogs.findById(blogId);
            console.log("blog ", blog);

           if(!blog){
            return res.status(404).json({ errs: ["Blog not found"] })
           }
            if(!blog.Likes.includes(userId)){
                blog.Likes.push(userId);
                user.Likes.push(blogId);
                await blog.save();
                await user.save();
            }else{
                 return  console.log("Blog already liked");
            }
            res.status(200).json({ msg: "blog liked successfully", blog })
        } catch (error) {
            console.log("error ", error);
            res.status(400).json({ errs: ["Error while liking blog"] })
        }
    }
    exports.postWatchLater = async (req, res) => {
        const userId=req.body?.userId;
        const blogId=req.body?.blogId;
           try {
           const user=await User.findById(userId);
           console.log("user ", user);
           if(!user){
            return res.status(404).json({ errs: ["User not found"] })
           }
           const blog=await Blogs.findById(blogId);
            console.log("blog ", blog);

           if(!blog){
            return res.status(404).json({ errs: ["Blog not found"] })
           }
            if(!blog.watchLater.includes(userId)){
                blog.watchLater.push(userId);
                user.watchLater.push(blogId);
                await blog.save();
                await user.save();
            }else{
                 return  console.log("Blog already in watch later");
            }
            res.status(200).json({ msg: "blog saved to watch Later successfully", blog })
        } catch (error) {
            console.log("error ", error);
            res.status(400).json({ errs: ["Error while saving blog to watch Later "] })
        }
    }

