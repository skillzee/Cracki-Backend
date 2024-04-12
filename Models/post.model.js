import mongoose from "mongoose"


const schema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    photo:{
        type:String,
        required: true
    },
    likes:{
        type: Number,
        default: 1
    },
    comments: [
        {
            text: {
                type: String,
                // required: true
            },
            author: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                // required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }

        }
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username:{
        type: String,

    }
},{timestamps: true})

export const Post = mongoose.model("Post", schema)
