dotenv.config();
import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
// import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import dotenv from "dotenv";
import { connectDB } from "./db/connect.js";
import cookieParser from "cookie-parser";
import AppError from "./utils/AppError.js";
import authRouter from "./routes/authRouter.js"
import projecRouter from "./routes/projectRouter.js";
import blogRouter from "./routes/blogRouter.js";
import emailRouter from "./routes/emailRouter.js";
import globalError from "./middleware/errorHandler.js";

// Connect to the database
connectDB();

const app: Express = express();
const PORT: number = Number(process.env.PORT) || 4000;
import bodyParser from 'body-parser';
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: ["GET", "POST","PATCH","DELETE"],
    credentials: true,
  })
);

// app.use(express.json()); 
// app.use(express.urlencoded({ extended: true }));
// Apply security and performance middleware
app.use(compression());
// app.use(helmet());
// app.use(
//   cors({
//     // origin: "https://debbalcom.vercel.app",
//     origin: "http://localhost:5000",
//     methods: ["GET", "POST","PUT","DELETE"],
//     credentials: true,
//   })
// );
// app.use(cors());// this is for development , other wise other origin connot get the sever
app.use(morgan("dev")); // Log HTTP requests to the console

// Root route to check if the server is running
app.get("/", (_: Request, res: Response) => {
  res.send("Server is running...");
});

// Define API routes
app.use("/api/auth", authRouter);
app.use("/api/v1/projects", projecRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("/api/v1/contact", emailRouter);

// Handle undefined routes (404 Not Found)
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handling middleware
app.use(globalError);

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
 
// Handle Unhandled Promise Rejections (e.g., DB connection failures not caught)
process.on('unhandledRejection', (err: Error) => {
  console.log('UNHANDLED REJECTION! Shutting down...');
  console.error(err.name, err.message);
  server.close(() => {
    process.exit(1); 
  });
});

// Handle Uncaught Exceptions (synchronous errors not caught anywhere)
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! Shutting down...');
  console.error(err.name, err.message, err.stack);
  server.close(() => {
    process.exit(1);
  });
});
