import { Request, Response, NextFunction } from "express";
import BlogPost from "../models/blogs.js";
import { AppError } from "../utils/AppEror.js";
import { catchAsync } from "../utils/catchAsync.js";

interface BlogQuery {
  page?: string;
  sort?: string;
}

export const getBlogs = catchAsync(
  async (
    req: Request<{}, {}, {}, BlogQuery>,
    res: Response,
    next: NextFunction
  ) => {
    const queryObj: Record<string, unknown> = { ...req.query };
    const excludedFields = ["page", "limit", "sort"];
    excludedFields.forEach((el) => delete queryObj[el]);

    let query = BlogPost.find(queryObj);

    if (req.query.sort && req.query.sort === "latest") {
      query = query.sort("createdAt");
    } else if (req.query.sort === "old") {
      query = query.sort("-createdAt");
    }

    const limit = 4;
    if (req.query.page) {
      const page = Math.max(1, parseInt(req.query.page || "1", 10));
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
    }

    const data = await query;

    if (!data || data.length === 0) {
      return next(new AppError("No Blogs available at the moment", 404));
    }

    const total = await BlogPost.countDocuments(queryObj);
    const totalPage = Math.ceil(total / limit);

    res.status(200).json({
      status: "success",
      totalPage,
      data,
    });
  }
);
