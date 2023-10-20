import { Router } from "express";
import { getAdmins } from "../controllers";
import { auth } from "../middlewares/auth";
import { adminLogin, getRequests, updateGroup, groupInfo, getAllMaterias, getMateria } from "../controllers/admin.controller";



const adminRouter = Router();

adminRouter.get('/', auth, getAdmins);
adminRouter.get('/groups/:id', groupInfo);
adminRouter.post('/login', adminLogin);
adminRouter.put('/updateGroup/:id', updateGroup);
adminRouter.get('/grupos/:id/solicitudes', getRequests);
adminRouter.get('/materias/:id', getMateria);
adminRouter.get('/materias', getAllMaterias);


export default adminRouter;