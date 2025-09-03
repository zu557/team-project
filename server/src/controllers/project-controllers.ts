
import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError.js";
import Project, { IProject } from "../models/projects.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import cloudinary from "../config/cloudinary.js";


// --- Get all projects ---
const getProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await Project.find();

    if (!data || data.length === 0) {
      return next(new AppError("No projects available at the moment", 404));
    }

    res.status(200).json({
      status: "success",
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
    const body = req.body as Pick<IProject, "title" | "description" | "category">;

    if (!req.file) {
      return next(new AppError("Image is required", 400));
    }

    // Upload image to Cloudinary
    const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

    const newProject = new Project({
      ...body,
      imageUrl ,
      publicId,
    });

    const savedProject = await newProject.save();

    res.status(201).json({
      status: "success",
      data: savedProject,})
  } catch (error) {
    next(error);
  }
}

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

export { getProjects, getProjectById, addProject, updateProject, deleteProject };