import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";

const adminRouter = Router();

adminRouter.get('/', getAdmins)

export default adminRouter;