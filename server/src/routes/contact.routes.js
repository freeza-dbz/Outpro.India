import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import { getContactInfo, updateContactInfo } from "../controllers/contact.controller.js";

const router = Router();

// Public route to get contact info
router.route("/").get(getContactInfo);

// Admin route to update contact info
router.route("/").patch(verifyJWT, verifyAdmin, updateContactInfo);

export default router;