import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./index.js";
dotenv.config();

process.on("uncaughtException", (error) => {
  console.log("uncaughtException", error);
  process.exit(1);
});

const dbUrl = process.env.MONGO_DB_URL;
const password = process.env.PASSWORD;
if (!dbUrl || !password) {
  throw new Error("something wrong");
}
const DB = dbUrl.replace("<db_password>", password);
mongoose
  .connect(DB)
  .then(() => {
    console.log("DB connected successfully");
  })
  .catch((error) => {
    console.log("DB connection Error", error);
  });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`App is running on ${port}`);
});

process.on("unhandledRejection", (error) => {
  console.log("unhandledRejection", error);
  server.close(() => process.exit(1));
});
