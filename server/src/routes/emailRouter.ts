import express from "express";
import { sendEmailHandler } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", sendEmailHandler);
export default router;
