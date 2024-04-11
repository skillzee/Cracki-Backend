import express from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { allPosts, comment, deletePost, likedAPost, newPost } from "../Controller/post.controller.js";

const router = express.Router();


router.route("/new").post(
    isAuthenticated
    ,upload.fields([
        {
            name: "photo",
            maxCount: 1
        }
    ]), 
    newPost)


router.route("/all").get(/*isAuthenticated,*/ allPosts)
router.route("/:id").put(isAuthenticated, likedAPost)
router.route("/:id/comment").put(isAuthenticated, comment)

router.route("/:id").delete(isAuthenticated, deletePost)

export default router