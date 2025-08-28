import BlogPost from "../models/blogs.js";
import { AppError } from "../utils/AppEror.js";
import { catchAsync } from "../utils/catchAsync.js";

export const getBlogs = catchAsync(async (req, res, next) => {
  const data = await BlogPost.find();

  if (!data || data.length === 0) {
    return next(new AppError("No Blogs available at the moment", 404));
  }

  res.status(200).json({
    status: "success",
    data,
  });
});
