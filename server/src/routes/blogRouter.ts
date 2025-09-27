import express from 'express';
import { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog } from '../controllers/blog-controllers.js';
import upload from "../middleware/upload-middleware.js";
// const authMiddleware = require("../middleware/auth-middleware");

const router = express.Router();

// Public 
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin
router.post('/', upload.single("image"), addBlog);
router.patch('/:id', upload.single('image'), updateBlog);
router.delete('/:id', deleteBlog);

export default router;
