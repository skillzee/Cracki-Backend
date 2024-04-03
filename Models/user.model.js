import mongoose from "mongoose"


const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique: true,
        lowerCase: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    avatar:{
        type: String,
        required: true
    }
},{timestamps: true})

export const User = mongoose.model("User", schema)