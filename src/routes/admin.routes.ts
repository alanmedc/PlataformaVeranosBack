import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";
import { adminLogin, updateGroup, groupInfo } from "../controllers/admin.controller";


const adminRouter = Router();

adminRouter.get('/', auth, getAdmins);
adminRouter.get('/groups/:id', groupInfo);
adminRouter.post('/login', adminLogin);
adminRouter.put('/updateGroup/:id', updateGroup);


export default adminRouter;