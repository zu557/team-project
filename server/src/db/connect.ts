import mongoose from "mongoose";

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_DB
} = process.env;

if (!MONGO_USER || !MONGO_PASSWORD || !MONGO_DB) {
  throw new Error("Missing MongoDB environment variables!");
}

const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@clustertodo.raz9g.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

export const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

