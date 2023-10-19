import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const helloWorld = (req: Request, res: Response) => {
    res.json({ message: "Hello world" });
};

//Admin
export async function getAdmins(req: Request, res: Response) {
    const admins = await prisma.admin.findMany()
    return res.json(admins)
};

//Solicitudes
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
                expediente_alumno: requestData.expediente_alumno,
                nombre_alumno: requestData.nombre_alumno,
                ap_paterno: requestData.ap_paterno,
                ap_materno: requestData.ap_materno,
                email_alumno: requestData.email_alumno,
                id_grupo: groupId,
            },
        });

        await prisma.grupo.update({
            where: {
                id_grupo: groupId,
            },
            data: {
                inscritos: {
                    increment: 1,
                },
            },
        });

        return res.status(201).json({ message: 'Solicitud creada correctamente', data: { id: newRequest.id_solicitud } });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear la solicitud' });
    }
}

//Feed Grupos
export async function getGroups(req: Request, res: Response) {
    try {
        const groups = await prisma.grupo.findMany({
            where: {
                OR: [
                    {
                        admin_created: {
                            equals: true
                        },
                    },
                    {
                        inscritos: {
                            gte: 5,
                        },
                    },
                ],
            },
            include: {
                materia: {
                    include: {
                        area: true,
                    },
                },
            },
        });

        const formattedGroups = groups.map((group) => ({
            clave_materia: group.materia?.clave,
            nombre_materia: group.materia?.nombre,
            area: group.materia?.area?.nombre,
            horario: `${group.hora_inicio} - ${group.hora_fin}`,
            profesor: group.profesor,
            costo: group.costo,
        }));

        return res.status(200).json(formattedGroups);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los grupos' });
    }
}