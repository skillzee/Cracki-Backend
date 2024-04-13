import { Post } from "../Models/post.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import jwt from "jsonwebtoken"

export const newPost = async(req, res)=>{
    const {title} = req.body
    const photoLocalPath = req.files?.photo[0]?.path

    if(!photoLocalPath){
        throw new ApiError(400, "Photo is required")
    }

    const photo = await uploadOnCloudinary(photoLocalPath)
    if(!photo){
        throw new ApiError(400, "Photo file is required")
    }
    // console.log(req);

    const post = await Post.create({
        title,
        photo: photo.url,
        user: req.user,
        username: req.user.username,
        userPfp: req.user.avatar
        
    })

    res.status(201).json({
        success: true,
        message: "Photo added successfully",
        photo: photo.url
    })

}
export const allPosts = async(req, res)=>{
        const posts = await Post.find({})

        res.json({
            success: true,
            posts: posts
        })
}



export const deletePost = async(req,res)=>{
    const {id} = req.params
    const post = await Post.findById(id);

    await post.deleteOne(post)

    res.status(200).json({
        success: true,
        message: "Post Deleted"
        
    })
}



export const likedAPost = async(req,res)=>{
    const {id} = req.params

    if(!id){
        res.status(400).json({
            success: false,
            message: "Post not found",

        })
    }
    
    const post = await Post.findById(id)
    // console.log(post);
    post.likes+=1
    // console.log(post.likes);


    await post.save()    
    

    res.status(200).json({
        success: true,
        message: "Likes Updated",
        post: post
    })
}


export const comment = async(req, res)=>{
    const {id} = req.params
    if(!id){
        res.status(400).json({
            success: false,
            message: "Post not found",

        })
    }

    const {username} = req.user

    const {comment} = req.body

    if(!comment){
        res.status(400).json({
            success: false,
            message: "Comment not found",

        })
    }

    const post = await Post.findById(id);

    const commentArr ={
        text: comment,
        author: username,
        user: req.user
    };


    post.comments.push(commentArr);
    

    await post.save()

    

res.status(200).json({
    success: true,
    username,
    message: "Commented"
})


}



export const particularPost= async(req, res)=>{
    const {id} = req.params
    if(!id){
        res.status(400).json({
            success: false,
            message: "Id of post not found"
        })
    }
    const post = await Post.findById(id)


    if(!id){
        res.status(400).json({
            success: false,
            message: "Post not found"
        })
    }

    res.status(200).json({
        message: "success",
        post
    })

    
}