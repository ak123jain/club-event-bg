import { Router } from "express";

import { createWaitlist  , createAdmin, login, registeruser, getuserbyid } from "../controller/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";
const router = Router();

// Route to create a waitlist entry
router.post("/waitlist", createWaitlist);
 

router.route("/admin").post(upload.single("avatar"),
           createAdmin);

router.route("/registeruser").post( 
            registeruser);          


router.route("/login").post( 
            login);


router.route("/getuser").get(
    verifyjwt,
    getuserbyid
)
            
            
export default router;