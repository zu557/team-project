import mongoose, { Schema, Model } from "mongoose";

// Define schema
const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    categories: { type: String },
    featuredImage: { type: String },
    publicId:{type: String , required :true}
  },
  { timestamps: true }
);

// Infer the TypeScript type directly from the schema
export type IBlogPost = mongoose.InferSchemaType<typeof blogPostSchema>;

// Create the model
const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "Blog",
  blogPostSchema
);

export default BlogPost;
