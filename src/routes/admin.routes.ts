import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";
import { adminLogin, getRequests, updateGroup } from "../controllers/admin.controller";


const adminRouter = Router();

adminRouter.get('/', auth, getAdmins);
adminRouter.post('/login', adminLogin);
adminRouter.put('/updateGroup/:id', updateGroup);
adminRouter.get('/grupos/:id/solicitudes', getRequests);


export default adminRouter;