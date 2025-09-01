import express from 'express'
const router = express.Router()
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { createComment, deleteComment, editComment, getAllCommentOwnMyBlog, getCommentOfPost, likeComment } from '../controlers/comment.controler.js'

router.post('/:id/create',isAuthenticated,createComment)
router.delete('/:id/delete',isAuthenticated,deleteComment)
router.put('/:id/edit',isAuthenticated,editComment)
router.route('/:id/comment/all').get(getCommentOfPost)
router.route('/:id/like').get(isAuthenticated,likeComment)
router.get('/my-blogs/comments',isAuthenticated,getAllCommentOwnMyBlog)
export default router