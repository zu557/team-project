import { Request, Response, NextFunction } from "express"; 
import AppError from "../utils/AppError.js";
import Project, { IProject } from "../models/projects.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";
import { isString } from "lodash-es";

/**
 * Defines the structure for the query parameters used for filtering and pagination.
 */
interface ProjectQuery {
  page?: string;
  sort?: string;
}

// --- Get all projects with optional pagination and sorting ---
export const getProjects = async (
  req: Request<{}, {}, {}, ProjectQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const queryObj: Record<string, unknown> = { ...req.query };
    const excludedFields = ["page", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = Project.find(queryObj);

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
      return next(new AppError("No Projects available at the moment", 404));
    }

    const total = await Project.countDocuments(queryObj);
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

// --- Get a single project by its ID ---
export const getProjectById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return next(new AppError(`No project found with ID: ${id}`, 404));
    }

    res.status(200).json({
      status: "success",
      data: project,
    });
  } catch (error) {
    next(error);
  }
};
export const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { post_data } = req.body;
    if (!post_data || typeof post_data !== "string") {
      return next(new AppError("Project post data is missing or invalid", 400));
    }

    const body = JSON.parse(post_data) as Pick<
      IProject,
      "title" | "description" | "category" | "githubLink" | "deploymentLink"
    >;

    // Declare variables in outer scope
    let imageUrl: string | undefined;
    let publicId: string | undefined;

    if (req.file) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      imageUrl = uploaded.imageUrl;
      publicId = uploaded.publicId;
    }

    const newProject = new Project({
      ...body,
      imageUrl,
      publicId,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      status: "success",
      data: savedProject,
    });
  } catch (error) {
    next(error);
  }
};

// --- Update an existing project by ID (optionally replace image) ---
export const updateProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    // Parse the body if it's sent as a JSON string
    const body = isString(req.body.post_data)
      ? JSON.parse(req.body.post_data)
      : req.body;

    const project = await Project.findById(id);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    // If a new image is uploaded, replace the old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (project.publicId) {
        await cloudinary.uploader.destroy(project.publicId);
      }

      // Upload new image
      const { imageUrl, publicId } = await uploadToCloudinary(
        req.file.buffer
      );
      body.imageUrl = imageUrl;
      body.publicId = publicId;
    }

    const updatedProject = await Project.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// --- Delete a project by ID (remove from DB + Cloudinary) ---
export const deleteProject = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    // Delete image from Cloudinary
    if (project.publicId) {
      await cloudinary.uploader.destroy(project.publicId);
    }

    // Delete from DB
    await Project.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Project deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
