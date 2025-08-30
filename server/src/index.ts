import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import projecRouter from "./routes/projectRouter.js";
import blogRouter from "./routes/blogRouter.js";
import emailRouter from "./routes/emailRouter.js";
import { globalError } from "./utils/globalError.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use("/api/v1/projects", projecRouter);
app.use("/api/v1/blogs", blogRouter);
app.use("api/v1/contact", emailRouter);

app.all("/{*any}", (req, res, next) => {
  res.status(404).json({
    status: "error",
    message: `Can't find ${req.originalUrl} on the server`,
  });
});

app.use(globalError);

export default app;
