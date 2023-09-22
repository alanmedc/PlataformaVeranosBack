import { Router } from "express";
import { getAdmins, helloWorld } from "../controllers";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";
import userRequestRouter from "./userRequest.routes";

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);
indexRouter.use("/admin", auth, adminRouter);
indexRouter.use("/newRequest", auth, userRequestRouter);

export default indexRouter;