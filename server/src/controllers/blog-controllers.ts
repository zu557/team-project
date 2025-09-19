import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import Blog, { IBlogPost } from "../models/blogs.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

/**
 * Defines the structure for the query parameters used for filtering and pagination.
 */
interface BlogQuery {
  page?: string;
  sort?: string;
}

// --- Get all blogs with optional pagination and sorting ---
export const getBlogs = async (
  req: Request<{}, {}, {}, BlogQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryObj: Record<string, unknown> = { ...req.query };
    const excludedFields = ["page", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Blog.find(queryObj);

    if (req.query.sort) {
      if (req.query.sort === "recent") {
        query = query.sort("-createdAt");
      } else if (req.query.sort === "old") {
        query = query.sort("createdAt");
      }
    } else {
      query = query.sort("-createdAt"); // Default to sorting by most recent
    }

    const limit = 6;
    const page = Math.max(1, parseInt(req.query.page || "1", 10));
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const data = await query;

    if (!data || data.length === 0) {
      return next(new AppError("No Blogs available at the moment", 404));
    }

    const total = await Blog.countDocuments(queryObj);
    const totalPage = Math.ceil(total / limit);

    res.status(200).json({
      status: "success",
      totalPage,
      data,
    });
  } catch (error) {
    next(error);
  }
};

// --- Get a single blog by its ID ---
export const getBlogById = async (req: Request, res: Response, next: NextFunction) => {
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
export const addBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Note: 'content' is now 'description' in the new schema.
    const body = req.body as Pick<IBlogPost, "title" | "description" | "author" | "categories">;

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    // Upload to Cloudinary
    // Renamed 'imageUrl' to 'coverImage' to match the new schema
    const { imageUrl: coverImage, publicId } = await uploadToCloudinary(req.file.buffer);

    const newBlog = new Blog({
      ...body,
      coverImage,
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
export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
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
      // Renamed 'imageUrl' to 'coverImage' to match the new schema
      const { imageUrl: coverImage, publicId } = await uploadToCloudinary(req.file.buffer);
      body.coverImage = coverImage;
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
export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
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
      sztatus: "success",
      message: "Blog deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
