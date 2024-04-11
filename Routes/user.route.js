import express from "express"
import { upload } from "../middlewares/multer.middleware.js";
import { createNewUser, getMyProfile, logInUser, logout } from "../Controller/user.controller.js";
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
router.route("/logout").post(/*isAuthenticated,*/ logout)
router.route("/my").get(isAuthenticated, getMyProfile)



export default router