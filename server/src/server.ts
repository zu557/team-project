import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import blog from "./routes/blog.js"; 
import catagories from "./routes/blog.js"; 

dotenv.config();
connectDB();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/catagory", catagories);
app.use("/api/blog", blog);

app.get("/", (_, res) => {
  res.send(" Server is running...");
});

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});
