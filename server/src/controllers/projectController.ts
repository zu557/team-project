import Project from "../models/projects.js";
import { AppError } from "../utils/AppEror.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getProjects = catchAsync(async (req, res, next) => {
  const data = await Project.find();
  if (!data || data.length === 0) {
    return next(new AppError("No projects available at the moment", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});
