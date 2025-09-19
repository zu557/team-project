import multer, { FileFilterCallback } from "multer";
import { Request } from "express";

// Use memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback): void => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Not an image! Please upload only images"));
  }
};

// Multer middleware
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter,
});

export default upload;
