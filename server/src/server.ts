import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./db/connect.js";
connectDB();

import blogRoute  from "./routes/blog.js"; 
import projectRoute from "./routes/projects.js"; 

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/catagory", projectRoute);
app.use("/api/blog", blogRoute);

app.get("/", (_, res) => {
  res.send(" Server is running...");
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
