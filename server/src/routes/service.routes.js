import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
    getAllServices,
    createService,
    updateService,
    deleteService,
} from "../controllers/service.controller.js";

const router = Router();

// Public route to get all services
router.route("/").get(getAllServices);

// Admin routes 
router.route("/").post(verifyJWT, verifyAdmin, createService);
router.route("/:id").patch(verifyJWT, verifyAdmin, updateService);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteService);

export default router;