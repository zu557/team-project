import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./index.js";
dotenv.config();

import { connectDB } from "./db/connect.js";
connectDB();
import AppError from "./utils/AppError.js"
import blogRoute  from "./routes/blog.js"; 
import projectRoute from "./routes/projects.js"; 
import errorHandler from "./middleware/errorHandler.js"

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4000;

app.use(cors());
app.use(express.json());

app.use("/api/project", projectRoute);
app.use("/api/blog", blogRoute);


app.get("/", (_, res) => {
  res.send(" Server is running...");
});
// Handle undefined routes (404 Not Found)
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});

// Handle Unhandled Promise Rejections (e.g., DB connection failures not caught)
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
    process.exit(1); 
});

// Handle Uncaught Exceptions (synchronous errors not caught anywhere)
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION!  Shutting down...');
  console.error(err.name, err.message, err.stack);
  process.exit(1);   
});

