import express from "express";
import { getBlogs } from "../controllers/blogConrollers.js";
const router = express.Router();

router.get("/", getBlogs);
export default router;
