// import dotenv from 'dotenv' 
// import mongoose from "mongoose";
// dotenv.config()
// const connectDB = async()=>{
//     try {

//         const uri = String(process.env.MONGO_URI)
//         console.log('MONGO_URI check kar rahe he value :', uri);
//         // await mongoose.connect(process.env.MONGO_URI)
//         await mongoose.connect("mongodb+srv://abhijyouti786_db_user:SC4X6ooccUXQROUm@cluster0.e1nefwh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
//         console.log("mongo connected successufuly")
//     } catch (error) {
//         console.log("mongodb error  in connection "+error)
//     }
// }
// export default connectDB 
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url'

// ES Module workaround for __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load .env from parent folder
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI
    console.log('MONGO_URI check kar rahe he value:', uri)

    await mongoose.connect(uri)
    console.log('Mongo connected successfully')
  } catch (error) {
    console.log('MongoDB error in connection:', error)
  }
}

export default connectDB
