import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", indexRouter)

export default app;