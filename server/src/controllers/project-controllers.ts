import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import Project, { IProject } from "../models/projects.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";

interface ProjectQuery {
  category?: string;
  page?: string;
  sort?: string;
}

// --- Get all projects with optional filtering, pagination, and sorting ---
const getProjects = async (
  req: Request<{}, {}, {}, ProjectQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { category, page, sort } = req.query;

    let query: Record<string, string> = {};
    if (category && category !== "All") {
      query.category = category;
    }

    const limit = 6;
    const pageNum = Math.max(1, Number(page));
    const skip = (pageNum - 1) * limit;

    let projectQuery = Project.find(query);

    // Apply sorting
    if (sort === "recent") {
      projectQuery = projectQuery.sort("-createdAt");
    } else if (sort === "old") {
      projectQuery = projectQuery.sort("createdAt");
    } else {
      projectQuery = projectQuery.sort("-createdAt"); // Default sort
    }

    const [data, total] = await Promise.all([
      projectQuery.skip(skip).limit(limit),
      Project.countDocuments(query),
    ]);

    if (!data || data.length === 0) {
      return next(new AppError("No projects available at the moment", 404));
    }

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

// --- Get a single project by ID ---
const getProjectById = async (req: Request, res: Response, next: NextFunction) => {
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

// --- Add a new project (with image upload) ---
const addProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const body = req.body as Pick<IProject, "title" | "description" | "category" | "gitubLink" | "deploymentLink">;

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    // Upload image to Cloudinary
    const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

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

// --- Update an existing project by ID (with optional new image) ---
const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const body = req.body as Partial<IProject>;

    const project = await Project.findById(id);
    if (!project) {
      return next(new AppError("Project not found", 404));
    }

    // If new image is provided, replace old one
    if (req.file) {
      // Delete old image from Cloudinary
      if (project.publicId) {
        await cloudinary.uploader.destroy(project.publicId);
      }

      // Upload new image
      const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

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

// --- Delete a project by ID (and remove its Cloudinary image) ---
const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
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

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};

export  {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
