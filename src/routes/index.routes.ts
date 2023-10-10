import { Router } from "express";
import { createRequest, getAdmins, helloWorld } from "../controllers";
import { apiOcr } from "../controllers/solicitudes";
import adminRouter from "./admin.routes";
import { auth } from "../middlewares/auth";
import multer from "multer";

const upload = multer({
    // dest: "uploads/",
})

const indexRouter = Router();

// Hello world
indexRouter.get("/", helloWorld);

indexRouter.use("/admin", auth, adminRouter);

indexRouter.post("/solicitudes", createRequest);

indexRouter.post("/ocr", upload.single('imagen'), apiOcr);

export default indexRouter;