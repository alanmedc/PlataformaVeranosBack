import { Router } from "express";
import { apiOcr } from "../controllers/solicitudes";
import { createRequest, getAdmins, getGroups, helloWorld } from "../controllers";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";
import multer from "multer";

const upload = multer({
    // dest: "uploads/",
})

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);

indexRouter.post("/solicitudes", upload.single('captura'), createRequest);
indexRouter.use("/admin", adminRouter)
indexRouter.get("/grupos", getGroups);

export default indexRouter;