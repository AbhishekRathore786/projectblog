import { json } from "express"
import  Blog  from "../models/blog.model.js"
import cloudinary from "../utils/cloudinary.js"
import getDataUri from "../utils/dataUri.js"

export const createBlog = async (req, res) => {
    try {
        const { title, category } = req.body
        if (!title || !category) {
            return res.status(400).json({
                message: "Blog title and  category is required"
            })
        }
        const blog = await Blog.create({
            title,
            category,
            author: req.id
        })
        return res.status(201).json({
            message: "Blog created successfully",
            success: true,
            blog
        })
    } catch (error) {
        console.log("error in blog creation in blog controler CREATEBLOG " + error)
        return res.status(500).json({
            message: "Eror in block creation",
            success: false
        })
    }
}

export const updateBlog = async (req, res) => {
    try {
        const blogId = req.params.blogId
        console.log(blogId)      // blogId name must be same in user.router  WHY 
        const { title, subtitle, description, category } = req.body
        const file = req.file
        let blog = await Blog.findById(blogId)
        if (!blog) {
            return
            res.status(404).json({
                message: "Blog not found for updation"
            })
        }
        let thumbnail;
        if (file) {
            const fileUri = await getDataUri(file)
            thumbnail = await cloudinary.uploader.upload(fileUri)
        }
        const updateData = { title, subtitle, description, category, author: req.id, thumbnail: thumbnail?.secure_url }
        blog = await Blog.findByIdAndUpdate(blogId, updateData, { new: true })
        return res.status(201).json({
            message: "Blog updated successfully",
            success: true,
            blog
        })
    } catch (error) {
        console.log("Error in updating blog " + error)
        return res.status(500).json({
            message: "Error in updating blog UPDATEBLOG in blog contoler"
        })
    }
}

export const getOwnBlogs = async (req, res) => {
    try {
        const userId = req.id;
        if (!userId) {
            return res.statsus(404).json({
                message: "User id  is required"
            })
        }
        const blogs = await Blog.find({ author: userId }).populate({
            path: 'author',
            select: 'firstName lastName photourl'
        })
        if (!blogs) {
            return res.status(404).json({
                message: "no blogs found", blogs: [], success: false
            })
        }
        return res.status(201).json({
            blogs, success: true
        })
    } catch (error) {
        console.log("error in getting blogs in backend   " + error)
        return res.status(500).json({
            message: "error in fetching block from backend",
            error: error.message
        })
    }
}

export const deleteBlog = async (req, res) => {
    try {
        const {blogId} = req.params
        console.log(blogId)
        const authorId = req.id
        console.log(authorId)
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "blog not  found "
            })
        }
        if (blog.author.toString() !== authorId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorised to delete this blog "
            })
        }
        await Blog.findByIdAndDelete(blogId)
        res.status(201).json({
            success: true,
            message: "Message deleted successfully"
        })
    } catch (error) {
        console.log("Error in deletion " + error)
        return res.status(500).json({
            success: false,
            message: "error in deleting the blog from the backend",
            error: error.message
        })
    }
}


export const getPublishedBlog = async (_, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 }).populate({
            path: 'author',
            select: (firstName, lastName, photourl)
        })
        if (!blogs) {
            res.status(401).json({
                message: "blog not found"
            })
        }
        return res.status(201).json({
            message: "blog fetched",
            success: true,
            blogs
        })
    } catch (error) {
        console.log("error in getting  published blog")
        return res.status(500).json({
            message: "failed  to get published blog"
        })
    }
}


//toggle  and published api  ok 
export const togglePublishedBlog = async (req, res) => {
    try {
        const {blogId} = req.params
    
        const blog = await Blog.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                message: "blog not found"
            })
        }
        // published  status  based on query parameter 
        blog.isPublished = !blog.isPublished
        await blog.save()
        const statusMessage = blog.isPublished ? "Published" : "Unpublished"
        return res.status(201).json({
            success: true,
            message: `blog is ${statusMessage}`
        })
    } catch (error) {
        console.log("failed to update status"+error)
    }
}

export const likeBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const LikedBy = req.id     /// kaha se aa raha he isAuthenticated se aa  raha he ok 
        const blog = await Blog.findById(blogId).populate({ path: 'likes' })
        if (!blog) {
            return res.status(404).json({
                message: "blog not found ",
                success: false
            })
        }
        await blog.updateOne({ $addToSet: { likes: LikedBy } })
       await blog.save()
        return res.status(200).json({
            message: "blog liked ", blog, success: true
        })
    } catch (error) {
        console.log("Error in liking " + error)
         return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}


export const dislikeBlog = async (req, res) => {
    try {
        const blogId = req.params.id
        const dislikedBy = req.id     /// kaha se aa raha he isAuthenticated se aa  raha he ok 
        const blog = await Blog.findById(blogId).populate({ path: 'likes' })
        if (!blog) {
            return res.status(404).json({
                message: "blog not found ",
                success: false
            })
        }
        // dislike ka logic

        await blog.updateOne({ $pull: { likes: dislikedBy } })
        await blog.save()
        return res.status(200).json({
            message: "blog disliked ", blog, success: true
        })
    } catch (error) {
        console.log("Error in liking ")
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })

    }
}


export const getMyTotalBlogLikes = async (req, res) => {
    try {
        const userId = req.id
        const myBlogs = await Blog.find({ author: userId }).select('likes')
        const totallikes = myBlogs.reduce((acc, blog) => acc + (blog.likes?.length || 0), 0)
        return res.status(200).json({
            success: true,
            totalBlogs: myBlogs.length,
            totallikes
        })
    } catch (error) {
        console.log("error is there " + error)
        return res.status(500).json({
            success: false,
            message: "failed to get total likes "
        })
    }
}