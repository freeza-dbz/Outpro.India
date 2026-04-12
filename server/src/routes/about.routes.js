import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { getAboutInfo, updateAboutInfo } from "../controllers/about.controller.js";

const router = Router();

// Public route 

router.route("/").get(getAboutInfo);

// Admin route

router.route("/").patch(verifyJWT, verifyAdmin, updateAboutInfo);

export default router;