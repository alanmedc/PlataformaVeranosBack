import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const helloWorld = (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
};

export async function getAdmins(req: Request, res: Response) {
    const admins = await prisma.admin.findMany()
    return res.json(admins)
}