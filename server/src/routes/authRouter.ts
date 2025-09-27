import express from "express";
import { loginUser,registerUser} from "../controllers/auth-controller.js"; 

const router = express.Router();

// POST /api/auth/login
router.post("/login", loginUser);
router.post("/register", registerUser);

export default router;
