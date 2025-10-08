import express from 'express';
import { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog } from '../controllers/blog-controllers.js';
import upload from "../middleware/upload-middleware.js";
import  {authMiddleware} from "../middleware/auth-middleware.js";

const router = express.Router();

// Public 
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin
router.post('/', authMiddleware, upload.single("image"), addBlog);
router.patch('/:id',authMiddleware, upload.single('image'), updateBlog);
router.delete('/:id',authMiddleware, deleteBlog);

export default router;
