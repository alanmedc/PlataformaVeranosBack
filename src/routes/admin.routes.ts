import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

/*router.get('/admin', async (req, res) => {
    const admins = await prisma.admin.findMany()
    res.json(admins)
})*/

export default router;