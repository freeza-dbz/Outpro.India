import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
    getAllMetrics,
    createMetric,
    updateMetric,
    deleteMetric,
} from "../controllers/metric.controller.js";

const router = Router();

// Public route to get all metrics
router.route("/").get(getAllMetrics);

// Admin routes
router.route("/").post(verifyJWT, verifyAdmin, createMetric);
router.route("/:id").patch(verifyJWT, verifyAdmin, updateMetric);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteMetric);

export default router;