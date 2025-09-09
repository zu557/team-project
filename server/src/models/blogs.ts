import mongoose, { Schema, Model } from "mongoose";

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    coverImage: { type: String },
  },
  { timestamps: true }
);

type IBlogPost = mongoose.InferSchemaType<typeof blogPostSchema>;

const BlogPost: Model<IBlogPost> = mongoose.model<IBlogPost>(
  "BlogPost",
  blogPostSchema
);

export default BlogPost;
