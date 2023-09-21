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
    try {
        const requestData = req.body;

        const requiredFields = ['id_solicitud', 'expediente_alumno', 'nombre_alumno', 'ap_paterno', 'ap_materno', 'email_alumno', 'id_grupo'];

        for (const field of requiredFields) {
            if (!requestData.hasOwnProperty(field) || requestData[field] === null || requestData[field] === undefined) {
                return res.status(400).json({ error: `El campo '${field}' es obligatorio` });
            }
        }
        const newRequest = await prisma.solicitud.create({
            data: requestData,
        });

        return res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
}