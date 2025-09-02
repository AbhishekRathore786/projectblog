import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './database/db.js'
import userrouter from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import blogrouter from './routes/blog.router.js'
import router from './routes/comment.router.js'
import path from 'path'
dotenv.config()
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'https://projectblog-frontend.onrender.com',
    credentials:true
}))
const _dirname = path.resolve()

app.use('/api/v1/user',userrouter)
app.use('/api/v1/blog',blogrouter)
app.use('/api/v1/comment',router)
app.use(express.static(path.join(_dirname,'/frontend/dist')))
// app.get("*",(_,res)=>{
// res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
// })
// http://localhost:8000/api/v1/user/register
const PORT = process.env.PORT || 3000
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

app.listen(PORT,()=>{
    connectDB()
    console.log("server is runign  "+PORT)
})