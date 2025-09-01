import express from 'express'
const blogrouter = express.Router()
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'
import { createBlog, deleteBlog, dislikeBlog, getMyTotalBlogLikes, getOwnBlogs, getPublishedBlog, likeBlog, togglePublishedBlog, updateBlog } from '../controlers/blog.controler.js'
blogrouter.route('/').post(isAuthenticated,createBlog)
blogrouter.route('/:blogId').put(isAuthenticated, singleUpload, updateBlog)
blogrouter.route('/get-own-blogs').get(isAuthenticated, getOwnBlogs)
blogrouter.route('/delete/:blogId').delete(isAuthenticated, deleteBlog)
blogrouter.route('/:id/like').get(isAuthenticated, likeBlog)
blogrouter.route('/:id/dislike').get(isAuthenticated, dislikeBlog)
blogrouter.route('/my-blogs/likes').get(isAuthenticated, getMyTotalBlogLikes)
blogrouter.route('/get-published-blog').get(getPublishedBlog)
blogrouter.route('/:blogId').patch(togglePublishedBlog)
export default blogrouter 