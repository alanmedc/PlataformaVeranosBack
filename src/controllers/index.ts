import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const helloWorld = (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
};

export async function getAdmins(req: Request, res: Response) {
    const admins = await prisma.admin.findMany()
    return res.json(admins)
};

export async function createRequest(req: Request, res: Response) {
    const newRequest = await prisma.solicitud.create({
        data: {
            id_solicitud: 1,
            expediente_alumno: 123456,
            nombre_alumno: 'Juan',
            ap_paterno: 'Perez',
            ap_materno: 'Sanchez',
            email_alumno: 'juan@example.com',
            id_grupo: 1,
        },
    });
    return res.json(newRequest);
}