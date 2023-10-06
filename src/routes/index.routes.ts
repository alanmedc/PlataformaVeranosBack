import { Router } from "express";
import { createRequest, getAdmins, helloWorld } from "../controllers";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";
import { apiOcr } from "../services/solicitud.services";

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);

indexRouter.use("/admin", auth, adminRouter);

indexRouter.post("/solicitudes", createRequest);

indexRouter.get("/ocr", apiOcr);

export default indexRouter;