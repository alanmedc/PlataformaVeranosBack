import { Router } from "express";
import { getAdmins, helloWorld } from "../controllers";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);
indexRouter.use("/admin", auth, adminRouter)

export default indexRouter;