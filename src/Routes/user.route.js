import { Router } from "express";

import { createWaitlist } from "../controller/user.controller.js";

const router = Router();

// Route to create a waitlist entry
router.post("/waitlist", createWaitlist);

//                /user/waitlist

export default router;
