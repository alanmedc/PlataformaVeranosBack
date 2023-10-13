import { Router } from "express";
import { createRequest, getAdmins, getGroups, helloWorld } from "../controllers";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);

indexRouter.use("/admin", adminRouter)
indexRouter.post("/solicitudes", createRequest);
indexRouter.get("/grupos", getGroups);

export default indexRouter;