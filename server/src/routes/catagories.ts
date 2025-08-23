import { Router } from "express";
import { 
  getCategories, 
  getCategory, 
  addCategory, 
  updateCategory, 
  deleteCategory 
} from "" // 👉 update this with the actual controller path

const router: Router = Router();

// Public routes
router.get("/categories", getCategories);
router.get("/categories/:id", getCategory);

// Admin-only routes
router.post("/categories", addCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;
