import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';
import Blog, { IBlogPost } from "../models/blogs.js";

// --- Get all blogs ---
const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Blog.find();

        if (!data || data.length === 0) {
            return next(new AppError("No blogs available at the moment", 404));
        }

        res.status(200).json({
            status: "success",
            data,
        });
    } catch (error) {
        next(error);
    }
};

// --- Get a single blog by its ID ---
const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);

        if (!blog) {
            return next(new AppError(`No blog found with ID: ${id}`, 404));
        }

        res.status(200).json({
            status: "success",
            data: blog,
        });
    } catch (error) {
        next(error);
    }
};

// --- Add a new blog ---
const addBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Pick<IBlogPost, 'title' | 'content' | 'author' | 'categories' | 'featuredImage'>;
        
        const newBlog = new Blog(body);
        const savedBlog = await newBlog.save();

        res.status(201).json({ 
            status: "success",
            data: savedBlog 
        });
    } catch (error) {
        next(error);
    }
};

// --- Update an existing blog by ID ---
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const body = req.body as Partial<IBlogPost>;

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedBlog) {
            return next(new AppError("Blog not found", 404));
        }

        res.status(200).json({ 
            status: "success",
            data: updatedBlog 
        });
    } catch (error) {
        next(error);
    }
};

// --- Delete a blog by ID ---
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const deletedBlog = await Blog.findByIdAndDelete(id);

        if (!deletedBlog) {
            return next(new AppError("Blog not found", 404));
        }

        res.status(200).json({ 
            status: "success",
            data: null 
        });
    } catch (error) {
        next(error);
    }
};

export { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog };
