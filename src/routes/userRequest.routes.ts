import { Router } from "express";
import { createRequest, getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";

const userRequestRouter = Router();

userRequestRouter.post('/', createRequest)

export default userRequestRouter;