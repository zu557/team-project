import { Request, Response, NextFunction } from "express";
import BlogPost from "../models/blogs.js";
import { AppError } from "../utils/AppEror.js";
import { catchAsync } from "../utils/catchAsync.js";

// Define a type for allowed query parameters
interface BlogQuery {
  page?: string;
  limit?: string;
  sort?: string;
  [key: string]: any;
}

export const getBlogs = catchAsync(
  async (req: Request<{}, {}, {}, BlogQuery>, res: Response, next: NextFunction) => {

    const queryObj: Record<string, unknown> = { ...req.query };
    const excludedFields = ["page", "limit", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = BlogPost.find(queryObj);

    if (typeof req.query.sort === "string") {
      query = query.sort(req.query.sort);
    } else {
      query = query.sort("-createdAt"); // default: newest first
    }

    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    const data = await query;

    if (!data || data.length === 0) {
      return next(new AppError("No Blogs available at the moment", 404));
  }

  const total = await BlogPost.countDocuments(queryObj);

  res.status(200).json({
    status: "success",
    results: data.length,
    total,
    page,
    pages: Math.ceil(total / limit),
    data,
  });
});
