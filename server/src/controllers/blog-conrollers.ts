import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import Blog, { IBlogPost } from "../models/blogs.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";


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

// --- Add a new blog (with image upload) ---
const addBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as Pick<
      IBlogPost,
      "title" | "content" | "author" | "categories"
    >;

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    // Upload to Cloudinary
    const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

    const newBlog = new Blog({
      ...body,
      imageUrl,
      publicId,
    });

    const savedBlog = await newBlog.save();

    res.status(201).json({
      status: "success",
      data: savedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// --- Update an existing blog by ID (optionally replace image) ---
const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body as Partial<IBlogPost>;

    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    // If a new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (blog.publicId) {
        await cloudinary.uploader.destroy(blog.publicId);
      }

      // Upload new image
      const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);
      body.imageUrl = imageUrl;
      body.publicId = publicId;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedBlog,
    });
  } catch (error) {
    next(error);
  }
};

// --- Delete a blog by ID (remove from DB + Cloudinary) ---
const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    if (!blog) {
      return next(new AppError("Blog not found", 404));
    }

    // Delete image from Cloudinary
    if (blog.publicId) {
      await cloudinary.uploader.destroy(blog.publicId);
    }

    // Delete from DB
    await Blog.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export { getBlogs, getBlogById, addBlog, updateBlog, deleteBlog };
