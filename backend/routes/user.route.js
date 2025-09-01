import express from 'express'
import { register,login,logout, updateProfile, getAllUsers } from '../controlers/user.controler.js'
const userrouter = express.Router()
import { isAuthenticated } from '../middleware/isAuthenticated.js'
import { singleUpload } from '../middleware/multer.js'
userrouter.route('/register').post(register)
userrouter.route('/login').post(login)
userrouter.route('/logout').get(logout)
userrouter.route('/profile/update').put(isAuthenticated, singleUpload, updateProfile)
userrouter.route('/all-users').get(getAllUsers)
export default userrouter