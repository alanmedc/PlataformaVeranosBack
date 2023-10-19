import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.routes";
import morgan from "morgan";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api", indexRouter)

export default app;