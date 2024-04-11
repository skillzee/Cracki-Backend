import jwt from "jsonwebtoken"


export const sendCookie = (user, res, message, statusCode = 200)=>{
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token", token,{
        httpOnly: true,
        secure: false,
        sameSite: "none",
    }).json({
        success: true,
        message: message,
        token
    })
}