import { Router } from "express";
import { helloWorld } from "../controllers";

const router = Router();

// Hello world
router.get("/", helloWorld);

export default router;