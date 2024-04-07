import mongoose from "mongoose"
import { User } from "../Models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiError } from "../utils/apiError.js";

import bcrypt from "bcrypt"
import { sendCookie } from "../utils/features.js";




export const createNewUser = async(req,res)=>{
    try {
        const {name, username, email, password} = req.body
    
        let user = await User.findOne({username});
    
        const avatarLocalPath = req.files?.avatar[0]?.path

        if(!name){
            console.log("Name not Found");
        }
        if(!username){
            console.log("username not Found");
        }
        if(!email){
            console.log("email not Found");
        }
        if(!password){
            console.log("password not Found");
        }
        if(!avatarLocalPath){
            console.log("avatarLocalPath not Found");
        }
    
        
    
        const avatar = await uploadOnCloudinary(avatarLocalPath)
    
        const hashedPassword = await bcrypt.hash(password, 10)
    
        if(user){
            return res.status(404).json({
                success: false,
                message: "User already exists",
            })
        }
    
        user = await User.create({
            name,
            username: username.toLowerCase(),
            email,
            password:hashedPassword,
            avatar: avatar?.url || "",
    
        })
    
        res.status(200).json({
            success: true,
            message: "Registered Succesfully",
            imageUrl: avatar.url
        })
    } catch (error) {
        throw new ApiError(400, "Problem in creating User", error)
    }
}




export const logInUser = async(req, res)=>{
    const {email, password} = req.body
    console.log(email);
    console.log(password);

    // if(!username || !email){
    //     throw new ApiError(400, "Username or email is required")
    // }

    const user =await User.findOne({email}).select("+password");
  

    // if(!user){
    //     throw new ApiError(404, "User does not exist")
    // }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }    


    const loggedInUser = await User.findById(user._id)

    sendCookie(user, res, `Welcome back, ${user.name}`, 200)
}


export const logout = (req,res)=>{
    res.status(200).cookie("token", "", {expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV == "DEVELOPMENT"?"lax": "none",
        secure:process.env.NODE_ENV == "DEVELOPMENT"?false: true
    }).json({
        success: true,
        message: "Logged Out Successfully",
        user: req.user
    })
}



export const getMyProfile = (req, res)=>{


    res.status(200).json({
        success: true,
        user: req.user
    }
    )
}