import mongoose, { Schema, Model } from "mongoose";

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    owner: { type: String, required: true },
    category: { type: String },
    imageUrl: { type: String },
  },
  { timestamps: true }
);

// Infer type from schema
type IProject = mongoose.InferSchemaType<typeof projectSchema>;

// Create model
const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema);

export default Project;
