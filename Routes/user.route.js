import express from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { createNewUser, getProfile, getUserProfile, logInUser, logout } from "../Controller/user.controller.js";
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
router.route("/:id").get(isAuthenticated, getUserProfile)



export default router