import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.routes";
import multer from "multer";

const app = express();
const upload = multer();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRouter)

export default app;