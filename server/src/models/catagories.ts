import { Document, Types,model, Schema } from "mongoose";

interface ICategory extends Document {
  name: string;                   
  isActive?: boolean;            
  parentCategory?: Types.ObjectId | null;
  imageUrl?: string;              
  order?: number;                  
  tags?: string[];               
}



const categorySchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String },
    isActive: { type: Boolean, default: true },
    parentCategory: { type: Schema.Types.ObjectId, ref: "Category", default: null },
    imageUrl: { type: String },
    order: { type: Number, default: 0 },
    tags: [{ type: String }]
  },
  { timestamps: true }
);


export default model<ICategory>("Category", categorySchema);
