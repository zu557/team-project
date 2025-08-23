import { Document, Types, model, Schema } from "mongoose";

interface IBlogPost extends Document {
  title: string;
  content: string;
  author: string;
  categories?: Types.ObjectId[];
  tags?: string[];
  featuredImage?: string
  order?: number;
}

const blogPostSchema: Schema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    tags: [{ type: String }],
    featuredImage: { type: String },
    order: { type: Number, default: 0 }
  },
  { timestamps: true }
);

export default model<IBlogPost>("BlogPost", blogPostSchema);
