import jwt from "jsonwebtoken"


export const sendCookie = (user, res, message, statusCode = 200)=>{
    const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET)

    res.status(statusCode).cookie("token", token,{
        httpOnly: true,
        maxAge: 15 * 60 * 1000,
        // sameSite: process.env.NODE_ENV == "DEVELOPMENT"?"lax": "none",
        sameSite:  "lax",
        // secure:process.env.NODE_ENV == "DEVELOPMENT"?false: true
        secure:false,
        domain: "localhost",
        path: "/"
    }).json({
        success: true,
        message: message,
        token
    })
}