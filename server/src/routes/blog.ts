import { Router } from 'express';
import { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog } from '../controllers/blog-controllers.js';
import upload from "../middleware/upload-middleware.js";

const router: Router = Router();

// Public
router.get('/', getBlogs);
router.get('/:id', getBlogById);

// Admin
router.post('/', upload.single("image"), addBlog);
router.put('/:id', updateBlog);
router.delete('/:id', deleteBlog);

export default router;
