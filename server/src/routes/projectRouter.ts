import express from "express";
import { getProjects, getProjectById, addProject, updateProject, deleteProject } from "../controllers/project-controllers.js";
import upload from "../middleware/upload-middleware.js";

const router = express.Router();

// Public Routes
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin Routes
router.post('/', upload.single("image"), addProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
