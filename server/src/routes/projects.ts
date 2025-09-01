import { Router } from "express";
import { 
  getProjects, getProjectById, addProject, updateProject, deleteProject 
} from  "../controllers/project-controllers.js"; 

const router: Router = Router();

// Public routes
router.get("/", getProjects);
router.get("/:id", getProjectById);

// Admin-only routes
router.post("/", addProject);
router.patch("/:id",updateProject)
router.delete("/:id", deleteProject);

export default router;
