
// import fs from 'fs'
// console.log("ENV file exists:", fs.existsSync('.env'))
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)
// import dotenv from 'dotenv'
// dotenv.config({ path: path.resolve(__dirname, '../.env') })
// import express from 'express'
// import cors from 'cors'
// import connectDB from './database/db.js'
// import userrouter from './routes/user.route.js'
// import cookieParser from 'cookie-parser'
// import blogrouter from './routes/blog.router.js'
// import router from './routes/comment.router.js'
// import path from 'path'
// import { fileURLToPath } from 'url'
// import cloudinary from './utils/cloudinary.js'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// ✅ Load .env before anything else
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })
import cloudinary, { configureCloudinary } from './utils/cloudinary.js'

// ✅ Call this AFTER dotenv.config()
configureCloudinary()

console.log("Cloudinary config loaded:", cloudinary.config())

import fs from 'fs'
console.log("ENV file exists:", fs.existsSync(path.resolve(__dirname, '../.env')))

import express from 'express'
import cors from 'cors'
import connectDB from './database/db.js'
import cookieParser from 'cookie-parser'
import userrouter from './routes/user.route.js'
import blogrouter from './routes/blog.router.js'
import router from './routes/comment.router.js'



console.log("Cloudinary config loaded:", cloudinary.config());
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
// app.use(cors({
//     origin:'https://projectblog-frontend.onrender.com',
//     credentials:true 
// }))

// app.use(cors())


const _dirname = path.resolve()
app.use(cors({
    origin:'https://projectblog-frontend2.onrender.com',
    credentials:true
})) 
    
app.use('/api/v1/user',userrouter)
app.use('/api/v1/blog',blogrouter)
app.use('/api/v1/comment',router)

app.use(express.static(path.join(__dirname, '/frontend/dist')))
// app.get("*", (_, res) => {
//   res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
// })

// app.get("*",(_,res)=>{
// res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// })
// http://localhost:8000/api/v1/user/register

const PORT = process.env.PORT || 3000

// app.listen(PORT,()=>{
//     connectDB()
//     console.log("server is runign  "+PORT)
// })

// app.get("/", (req, res) => {
//   res.send("API is running 🚀");
// });

// app.listen(PORT,()=>{
//     await connectDB()
//     console.log("server is runign  "+PORT)
// })

const startServer = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => {
      console.log("Server is running on port " + PORT)
    })
  } catch (error) {
    console.error("Failed to start server:", error)
  }
}

startServer()
