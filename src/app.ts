import express from "express";
import cors from "cors";
import router from "./routes/index.routes";
import adminRoutes from "./routes/admin.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", router)
app.use("/api", adminRoutes)

export default app;