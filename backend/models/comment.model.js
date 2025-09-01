import mongoose from 'mongoose'
import Blog from './blog.model.js'
import User from './user.model.js'
const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:{
        type:Array,
        default:[]
    },
    numberOfLikes:{
            type:Number,
            default:0
    }
},{timestamps:true})

const Comment = mongoose.model("Comment",commentSchema)

export default Comment