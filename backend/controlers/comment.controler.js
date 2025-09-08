import  Blog  from '../models/blog.model.js'
import  Comment  from '../models/comment.model.js'
export const createComment = async (req, res) => {
    try {
        const postId = req.params.id
        const CommentBy = req.id      // given by the token
        const { content } = req.body
        const blog = await Blog.findById(postId)
        if (!content) return res.status(400).json({ message: "content is required", success: false })
        const comment = await Comment.create({
            content,
            userId: CommentBy,
            postId: postId
        })
        await comment.populate({
            path: 'userId',
            select: 'firstName lastName photourl'
        })
        blog.comments.push(comment._id)
        await blog.save()
        return res.status(201).json({
            message: "comment added successfully",
            comment,
            success: true
        })
    }
    catch (error) {
        console.log("error is there" + error)
    }
}

export const getCommentOfPost = async(req,res)=>{
        try {
            const blogId = req.params.id
            const comments = await Comment.find({postId:blogId}).populate({
                path:'userId',
                select:'firstName lastName photourl'
            }).sort({createdAt:-1})
            if(!comments) return res.status(401).json({
                message:'Comment not added',
                success:false
            })
            return res.status(201).json({message:"no comments found for this blog",success:true,comments})
        } catch (error) {
            console.log("error is there "+error)
        }
}

export const deleteComment = async(req,res)=>{
    try {
        const commentId = req.params.id
        const  authorId = req.id      // jwt token denga
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(401).json({
                message:"comment not found",success:false
            })
        }
        if(comment.userId.toString()!== authorId){
            return res.status(401).json({
                message:"unauthorised  to delete this comment",success:false
            })
        }
        const blogId = comment.postId
        await Comment.findByIdAndDelete(commentId)
        //blog comment array me se bhi commet ko hataana hoga 
        await Blog.findByIdAndUpdate(blogId,{
            $pull:{comments:commentId}
        })
        res.status(201).json({
            message:"comment deleted  successfully",
            success:true
        })
    } catch (error) {
        console.log("error is there in deleting the comments"+error)
    }
}

export const editComment = async(req,res)=>{
    try {
        const userId = req.id // matlab humaara jwt degaa 
        const {content} = req.body
        const commentId = req.params.id
        const comment = await Comment.findById(commentId)
        if(!comment){
            return res.status(401).json({
                message:'not uthorised to delete  this comment',
                success:false
            })
        }
        comment.content = content;
        comment.editedAt = new Date()
        await comment.save()
        res.status(200).json({
            message:"comment updated successfully",success:true,comment
        })
    } catch (error) {
        console.log("error is there "+error)
    }
}

export const likeComment= async(req,res)=>{
    try {
        const userId = req.id
        const commentId =req.params.id
        const comment = await Comment.findById(commentId).populate("userId")
        if(!comment){
          return  res.status(401).json({
                message:"comment not found",
                success:false
            })
        }
        const alreadyLiked = comment.likes.includes(userId)
        if(alreadyLiked){
            // if already liked then unlike it ok
            comment.likes= comment.likes.filter(id=> id !== userId)
            comment.numberOfLikes -=1
        }
        else{
            // if not liked yet likes
            comment.likes.push(userId)
            comment.numberOfLikes +=1
        }
        await comment.save()
        res.status(201).json({
            message:alreadyLiked ? "comment unlike" :"comment Like",
            success:true,
            updatedComment:comment
        })
        
    } catch (error) {
        console.log("error is there "+error)
        res.status(500).json({
            message:"something went wrong in the server side ",
            success:true,
            error:error.message
        })
    }
}

export const getAllCommentOwnMyBlog = async(req,res)=>{
    try {
        const userId = req.id
        const myBlogs = await Blog.find({author:userId}).select("_id")
        const blogIds = myBlogs.map(blog=>blog._id) // kyo lenght lene ke liye 
        if(blogIds.length===0){
           return res.status(200).json({
                success:true,
                totalComment:0,
                comments:[],
                message:" no blog found for this user"
            })
        }
        const comments = await Comment.find({postId:{$in:blogIds}}).populate("userId", "firstName lastName email").populate("postId","title")
      return  res.status(201).json({
            success:true,
            totalComments:comments.length,
            comments
        })
    } catch (error) {
        console.log('error in getting all comments on my blog'+error)
       return res.status(500).json({
            message:"error from the server side ",
            success:false
        })
    }
}