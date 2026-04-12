import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { verifyAdmin } from "../middleware/admin.middleware.js";
import {
    getAllPortfolios,
    createPortfolio,
    updatePortfolio,
    deletePortfolio,
} from "../controllers/portfolio.controller.js";

const router = Router();

// Public route 

router.route("/getAllPortfolios").get(getAllPortfolios);

// Admin routes 

router.route("/createPortfolio").post(verifyJWT, verifyAdmin, createPortfolio);

router.route("/updatePortfolio/:id").patch(verifyJWT, verifyAdmin, updatePortfolio);

router.route("/delete/:id").delete(verifyJWT, verifyAdmin, deletePortfolio);


export default router;