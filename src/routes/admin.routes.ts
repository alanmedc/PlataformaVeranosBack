import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";
import { adminLogin } from "../controllers/admin.controller";


const adminRouter = Router();

adminRouter.get('/', getAdmins);
adminRouter.post('/login', adminLogin);

export default adminRouter;