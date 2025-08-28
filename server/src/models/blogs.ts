import mongoose, { Schema, Model } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    categories: { type: String },
    featuredImage: { type: String },
  },
  { timestamps: true }
);

type IBlogPost = mongoose.InferSchemaType<typeof blogPostSchema>;

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  blogPostSchema
);

export default BlogPost;
