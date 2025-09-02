import dotenv from 'dotenv' 
import mongoose from "mongoose";
dotenv.config()
const connectDB = async()=>{
    try {
        console.log('MONGO_URI check kar rahe he value :', process.env.MONGO_URI);
        await mongoose.connect(process.env.MONGO_URI)
        console.log("mongo connected successufuly")
    } catch (error) {
        console.log("mongodb error  in connection "+error)
    }
}
export default connectDB