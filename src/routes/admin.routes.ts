import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";
import { adminLogin, updateGroup } from "../controllers/admin.controller";


const adminRouter = Router();

adminRouter.get('/', auth, getAdmins);
adminRouter.post('/login', adminLogin);
adminRouter.put('/updateGroup/:id', updateGroup);
adminRouter.get('/grupos/:id/solicitudes',);


export default adminRouter;