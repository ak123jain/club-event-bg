import { Router } from "express";
import { addevent, editevents, getallevent, getallparticipants, joinevent } from "../controller/event.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyjwt } from "../middlewares/auth.middleware.js";


const router = Router();

// router.route("/addevents/:id").post(
//     upload.single("eventphoto"),
//     addevent
// )


router.route("/addevents/:id").post(
  (req, res, next) => {
    console.log("📥 Route hit: /addevents/:id");
    next();
  },
  upload.single("eventphoto"),
  (req, res, next) => {
    console.log("📤 Multer processed file:", req.file?.path);
    next();
  },
  addevent
);

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