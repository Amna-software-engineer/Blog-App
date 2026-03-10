import Blogs from "../models/blogModel.js";
import User from "../models/userModel.js";
import Comments from "../models/commentsModel.js";

// 1. Create Blog Controller
export const postCreateBlog = async (req, res) => {
    const { title, description, image } = req.body;
    try {
        const Newblog = await Blogs.create({ title, description, image });
        console.log("Newblog", Newblog);
        res.status(200).json({ msg: "blog created successfully", Newblog });
    } catch (error) {
        console.log("Error ", error);
        res.status(400).json({ errs: ["Error while creating blogs"] });
    }
};

// 2. Get All Blogs Controller
export const getAllBlogs = async (req, res) => {
    try {
        const AllBlogs = await Blogs.find();
        console.log("AllBlogs ", AllBlogs);
        res.status(200).json(AllBlogs);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching blogs"] });
    }
};

// 3. Post Add Comment Controller
export const postAddComment = async (req, res) => {
    const { blogId, userId, commentBody } = req.body;
    try {
        const user = await User.findById(userId);
        const blog = await Blogs.findById(blogId);

        if (user && blog) {
            const newComment = new Comments({ blogId, userId, content: commentBody });
            const addedComent = await newComment.save();
            console.log("addedComent ", addedComent);
            res.status(200).json({ msg: "comment added successfully", addedComent });
        } else {
            res.status(404).json({ errs: ["User or blog not found"] });
        }
    } catch (error) {
        console.log("Error ", error);
        res.status(400).json({ errs: ["Error while adding comment"] });
    }
};

// 4. Get Comments Controller
export const getComments = async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const AllComments = await Comments.find({ blogId }).populate("userId", "firstName email");
        console.log("AllComments ", AllComments);
        res.status(200).json(AllComments);
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching comments"] });
    }
};

// 5. Get Single Blog Controller
export const getSingleBlog = async (req, res) => {
    const blogId = req.params.blogId;
    try {
        const blog = await Blogs.findById(blogId);
        if (!blog) {
            return res.status(404).json({ errs: ["Blog not found"] });
        }
        console.log("single blog ", blog);
        res.status(200).json({ msg: "Blog fetched successfully", blog });
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while fetching single blog"] });
    }
};

// 6. Post Like Blog Controller
export const postLikeBlog = async (req, res) => {
    const userId = req.body?.userId;
    const blogId = req.body?.blogId;

    try {
        const user = await User.findById(userId);
        const blog = await Blogs.findById(blogId);

        if (!user || !blog) {
            return res.status(404).json({ errs: ["User or Blog not found"] });
        }

        if (!blog.Likes.includes(userId)) {
            blog.Likes.push(userId);
            user.Likes.push(blogId);
            await blog.save();
            await user.save();
            res.status(200).json({ msg: "blog liked successfully", blog });
        } else {
            res.status(400).json({ msg: "Blog already liked" });
        }
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while liking blog"] });
    }
};

// 7. Post Watch Later Controller
export const postWatchLater = async (req, res) => {
    const userId = req.body?.userId;
    const blogId = req.body?.blogId;

    try {
        const user = await User.findById(userId);
        const blog = await Blogs.findById(blogId);

        if (!user || !blog) {
            return res.status(404).json({ errs: ["User or Blog not found"] });
        }

        if (!blog.watchLater.includes(userId)) {
            blog.watchLater.push(userId);
            user.watchLater.push(blogId);
            await blog.save();
            await user.save();
            res.status(200).json({ msg: "blog saved to watch Later successfully", blog });
        } else {
            res.status(400).json({ msg: "Blog already in watch later" });
        }
    } catch (error) {
        console.log("error ", error);
        res.status(400).json({ errs: ["Error while saving blog to watch Later "] });
    }
};

