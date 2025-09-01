import { Router } from 'express'
import { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog } from '../controllers/blog-conrollers.js'
 
const router: Router = Router()

router.get('/blog-post', getBlogs)

router.get('/blog-post/:id', getBlogById)

router.post('/blog-post', addBlog)// only for admin

router.put('/blog-post/:id', updateBlog)// only for admin

router.delete('/delete-blog-post/:id', deleteBlog)// only for admin

export default router