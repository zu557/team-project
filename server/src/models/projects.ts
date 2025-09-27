import mongoose, { Schema, Model } from "mongoose";

const projectSchema = new Schema(

  {

    title: { type: String, required: true, trim: true },

    description: { type: String, required: true },

    category: { type: String },

    imageUrl: { type: String },

    githubLink: String,

    deploymentLink:{ type: String, required: true },

    publicId: {type: String},

  },

  { timestamps: true }

);



// Infer type from schema

export type IProject = mongoose.InferSchemaType<typeof projectSchema>;



// Create model

const Project: Model<IProject> = mongoose.model<IProject>("Project", projectSchema);



export default Project;