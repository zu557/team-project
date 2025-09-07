import Project from "../models/projects.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getProjects = catchAsync(async (req, res, next) => {
  const { category } = req.query;

  let query: Record<string, string> = {};
  if (category && category !== "All") {
    query.category = category.toString();
  }

  const data = await Project.find(query);

  res.status(200).json({
    status: "success",
    data,
  });
});
