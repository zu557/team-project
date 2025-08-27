import mongoose, { Schema, Model } from "mongoose";

// Define schema
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

// Infer the TypeScript type directly from the schema
type IBlogPost = mongoose.InferSchemaType<typeof blogPostSchema>;

// Create the model
const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  blogPostSchema
);

export default BlogPost;
