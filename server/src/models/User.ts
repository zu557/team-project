import { Document, Schema, model, Types } from "mongoose";

// Extend Document so we get _id plus timestamps if needed
export interface IUser extends Document {
  _id: Types.ObjectId;      // 👈 add this line
  username: string;
  password: string;
}

// Define the Mongoose schema for the User
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    
  },
  { timestamps: true }
);



// Export the Mongoose model, making sure to apply the generated type.
// The model will have the methods of a standard Mongoose document.
export default model<IUser & Document>("User", UserSchema);
