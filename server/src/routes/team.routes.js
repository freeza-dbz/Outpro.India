import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
    getAllTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
} from "../controllers/team.controller.js";

const router = Router();

// Public route to get all team members
router.route("/").get(getAllTeamMembers);

// Admin routes
router.route("/").post(verifyJWT, verifyAdmin, createTeamMember);
router.route("/:id").patch(verifyJWT, verifyAdmin, updateTeamMember);
router.route("/:id").delete(verifyJWT, verifyAdmin, deleteTeamMember);

export default router;