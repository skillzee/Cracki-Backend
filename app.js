import express from "express"
import cors from "cors"
import userRouter from "./Routes/user.route.js"
import {config} from "dotenv"
import cookieParser from "cookie-parser"
import postRouter from "./Routes/post.route.js"

export const app = express()

config({
    path:"DbConnect/config.env"
})

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    origin: "https://cracki.sytes.net",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))



app.use("/users", userRouter)
app.use("/posts", postRouter)

app.use(express.static("public"))

app.get("/",(req, res)=>{
    res.send("Server is working Properly")    
})