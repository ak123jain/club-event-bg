import { Router } from "express";

import { addclub, getallclub, getclubbyid } from "../controller/club.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";

const router = Router();

// Route to create a waitlist entry

router.route("/addclub").post(
    upload.single("clubphoto"),
    verifyjwt,
     addclub);

router.route('/getclub').get( 
     getallclub
)

export default router;