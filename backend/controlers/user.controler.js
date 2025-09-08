import  User  from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";
import { isAuthenticated } from "../middleware/isAuthenticated.js";
export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields required"
            })
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "invalid Email"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "password must be atleast 6 characters"
            })
        }
        const existinguserByEmail = await User.findOne({ email: email })
        if (existinguserByEmail) {
            return res.status(400).json({
                success: false,
                message: "email already exist"
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        await User.create({
            firstName, lastName, email, password: hashPassword
        })

        return res.status(201).json({
            success: true,
            message: `account created successfuly ${req.body.firstName}`
        })
    } catch (error) {
        console.log("error in user controler")
        return res.status(500).json({
            success: false,
            message: "failed to register"
        })
    }
}
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "incorrect email and password"
            })
        }
        const isPasswordValid = await bcrypt.compare(password
            , user.password
        )
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credential"
            })
        }
        const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: '1d' })
        return res.status(200).cookie("token", token, { maxAge:  24 * 60 * 60 * 1000, httpOnly: true, sameSite: "lax" }).json({
            success: true,
            messagge: `welcome back ${user.firstName}`,
            user
        })
    } catch (error) {
        console.log("error in user controler" + error)
        return res.status(500).json({
            success: false,
            message: "failed to login"
        })
    }
}

export const logout = async (__, res) => {
    try {
        res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "log out successfully ",
            success: true
        })
    } catch (error) {
        console.log("err" + error)
    }
}

    export const updateProfile = async (req, res) => {
        try {
            // console.log("updating")
            const userId = req.id
            const { firstName, lastName, occupation, bio, instagram, facebook, linkedin, github } = req.body
            const file = req.file;
            const user = await User.findById(userId).select('-password')
            // const fileUri = await getDataUri(file)
            // let cloudResponse = await cloudinary.uploader.upload(fileUri)
            // console.log(cloudResponse)
            if (file) {
                const fileUri = await getDataUri(file);
                const cloudResponse = await cloudinary.uploader.upload(fileUri);
                user.photourl = cloudResponse.secure_url;
            }
            if (!user) {
                console.log("user nor found")
                return res.status(404).json({
                    message: "user not found",
                    success: false
                })
            }
            if (firstName) user.firstName = firstName;
            if (lastName) user.lastName = lastName;
            if (occupation) user.occupation = occupation
            if (instagram) user.instagram = instagram;
            if (facebook) user.facebook = facebook;
            if (linkedin) user.linkedin = linkedin;
            if (github) user.github = github;
            if (bio) user.bio = bio;
            // if (file) user.photourl = cloudResponse.secure_url;
            await user.save()
            return res.status(200).json({
                message: "file updated ",
                success: true,
                user
            })

        }
        catch (error) {
            console.log("error  from the server " + error)
            return res.status(500).json({
                message: "Failed to update the profile",
                success: false
            })
        }
    }

export const getAllUsers =async(req,res)=>{
    try {
        const user = await User.find().select('-password')
            res.status(200).json({
                success:true,
                total:user.length,
                user
            })
    } catch (error) {
        console.log("error in getting users"+error)
        res.status(500).json({
            success:false,
            message:"failed to fetch users"
        })
    }
}