import Project from "../models/projects.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getProjects = catchAsync(async (req, res, next) => {
  const { category, page } = req.query;

  let query: Record<string, string> = {};
  if (category && category !== "All") {
    query.category = category.toString();
  }
  const limit = 6;
  const pageNum = Math.max(1, Number(page));
  const skip = (pageNum - 1) * limit;

  const [data, total] = await Promise.all([
    Project.find(query).skip(skip).limit(limit).sort("-createdAt"),
    Project.countDocuments(query),
  ]);

  const totalPage = Math.ceil(total / limit);

  res.status(200).json({
    status: "success",
    data,
    totalPage,
  });
});
