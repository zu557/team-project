import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/AppError.js';
import Project, { IProject } from "../models/projects.js";

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

// --- Get a single project by its ID ---
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

//--- Add a new project ---
const addProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const body = req.body as Pick<IProject, 'title' | 'description' | 'category'|'imageUrl'>;
        
        const newProject = new Project(body);
        const savedProject = await newProject.save();

        res.status(201).json({ 
            status: "success",
            data: savedProject 
        });
    } catch (error) {
        next(error);
    }
};

// --- Update an existing project by ID ---
const updateProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const body = req.body as Partial<IProject>;

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            body,
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return next(new AppError("Project not found", 404));
        }

        res.status(200).json({ 
            status: "success",
            data: updatedProject 
        });
    } catch (error) {
        next(error);
    }
};

// --- Delete a project by ID ---
const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;

        const deletedProject = await Project.findByIdAndDelete(id);

        if (!deletedProject) {
            return next(new AppError("Project not found", 404));
        }

        res.status(200).json({ 
            status: "success",
            data: null 
        });
    } catch (error) {
        next(error);
    }
};

export { getProjects, getProjectById, addProject, updateProject, deleteProject };
