import { Router } from "express";
import { addevent, editevents, getallevent, getallparticipants, joinevent } from "../controller/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


const router = Router();

router.route("/addevents/:id").post(
    upload.single("eventphoto"),
    addevent
)


 

router.route("/getevents").get(
    getallevent
)


router.route("/editevent/:id").put(
     editevents
)

router.route("/joinevent/:id").post(
    verifyjwt,
    joinevent
)

router.route("/getallparticipants/:id").get(
     getallparticipants
)


export default router;