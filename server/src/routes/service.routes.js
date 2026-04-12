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

// Public route to get all services for display on the site

router.route("/getAllServices").get(getAllServices);

// Admin routes 

router.route("/createService").post(verifyJWT, verifyAdmin, createService);

router.route("/updateService/:id").patch(verifyJWT, verifyAdmin, updateService);

router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deleteService);

export default router;