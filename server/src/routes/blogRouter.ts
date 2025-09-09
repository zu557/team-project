import express from "express";
import { getBlog, getBlogs } from "../controllers/blogConrollers.js";
const router = express.Router();

router.get("/", getBlogs);
router.get("/:blogId", getBlog);
export default router;
