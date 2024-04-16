import express from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { createNewUser, getProfile, getUserProfile, logInUser, logout, searchProfile } from "../Controller/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.js";


const router = express.Router();


router.route("/new").post(
    upload.fields([
        {
            name: "avatar",
            maxcount: 1,
        }
    ]),
    createNewUser
)


router.route("/login").post(logInUser)
router.route("/logout").post(isAuthenticated, logout)
router.route("/myProfile").get(isAuthenticated, getProfile)
router.route("/search").post(isAuthenticated, searchProfile)
router.route("/:id").get(isAuthenticated, getUserProfile)



export default router