import { Router } from "express";
import { getProjects, getProjectById, addProject, updateProject, deleteProject } from "../controllers/project-controllers.js";
import upload from "../middleware/upload-middleware.js";

const router: Router = Router();

// Public
router.get('/', getProjects);
router.get('/:id', getProjectById);

// Admin
router.post('/', upload.single("image"), addProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
