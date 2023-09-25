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

        const requiredFields = ['expediente_alumno', 'nombre_alumno', 'ap_paterno', 'ap_materno', 'email_alumno', 'clave_materia'];

        for (const field of requiredFields) {
            if (!requestData.hasOwnProperty(field) || requestData[field] === null || requestData[field] === undefined) {
                return res.status(400).json({ error: `El campo '${field}' es obligatorio` });
            }
        }

        const existingGroup = await prisma.grupo.findFirst({
            where: {
                clave_materia: requestData.clave_materia,
            },
        });

        let groupId;

        if (existingGroup) {
            groupId = existingGroup.id_grupo;
        } else {
            const newGroup = await prisma.grupo.create({
                data: {                    
                    clave_materia: requestData.clave_materia,
                },
            });
            groupId = newGroup.id_grupo;
        }
        
        const newRequest = await prisma.solicitud.create({
            data: {
                id_solicitud: 3,
                expediente_alumno: requestData.expediente_alumno,
                nombre_alumno: requestData.nombre_alumno,
                ap_paterno: requestData.ap_paterno,
                ap_materno: requestData.ap_materno,
                email_alumno: requestData.email_alumno,
                id_grupo: groupId,
            },
        });

        return res.json(newRequest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la solicitud' });
    }
}