import mongoose from "mongoose";
import dotenv from 'dotenv'
const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.Mongo_URI)
        console.log("mongo connected successufuly")
    } catch (error) {
        console.log("mongodb error"+error)
    }
}
export default connectDB