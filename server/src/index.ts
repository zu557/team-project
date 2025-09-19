// import express from "express";
// import cors from "cors";
// import helmet from "helmet";
// import morgan from "morgan";
// import comprssion from "compression";
// import projecRouter from "./routes/projectRouter.js";
// import blogRouter from "./routes/blogRouter.js";
// import emailRouter from "./routes/emailRouter.js";
// import globalError from "./middleware/errorHandler.js";

// const app = express();

// app.use(express.json());
// app.use(comprssion());
// app.use(helmet());
// app.use(
//   cors({
//     origin: "https://debbalcom.vercel.app",
//     methods: ["GET", "POST"],
//     credentials: true,
//   })
// );
// app.use(morgan("dev"));

// app.use("/api/v1/projects", projecRouter);
// app.use("/api/v1/blogs", blogRouter);
// app.use("/api/v1/contact", emailRouter);

// app.all("/{*any}", (req, res, next) => {
//   res.status(404).json({
//     status: "error",
//     message: `Can't find ${req.originalUrl} on the server`,
//   });
// });

// app.use(globalError);

// export default app;
