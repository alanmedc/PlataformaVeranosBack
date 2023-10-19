import { Request, Response } from "express";
import { PrismaClient, grupo } from "@prisma/client";
import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { JWT_SECRET } from "../configs/configs";
const prisma = new PrismaClient();

export const adminLogin = async (req: Request, res: Response) => {

    //POR SI HAY QUE ACTUALIZAR ALGUN CAMPO EN LA BASE DE DATOS
    // const newPassword = bcrypt.hashSync(req.body.password, 10);
    // await prisma.admin.updateMany({
    //     where: {
    //         username: req.body.username
    //     },
    //     data:{
    //         password: newPassword
    //     }
    // })
    // return res.send("todo bien");

    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Faltan datos.' });
        }

        const admin = await prisma.admin.findFirst({
            where: {
                username: username,
            },
        });

        if (!admin) {
            return res.status(404).json({ message: "Admin no encontrado." });
        }

        const isValidPass = bcrypt.compareSync(password, admin.password!);

        if (!isValidPass) {
            return res.status(400).json({ message: "Contraseña no valida." });
        }

        const token = jwt.sign({ id: admin.id_admin }, JWT_SECRET);

        return res.json({
            message: "Login correcto.",
            data: token
        });

    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal." });
    }
}

async function createGroup(groupData: Omit<grupo, 'id_grupo'>, claveMateria: number) {
    try {
        const existingMateria = await prisma.materia.findUnique({
            where: { clave: claveMateria },
        });

        if (!existingMateria) {
            return { error: 'La materia especificada no existe' };
        }

        const newGroup = await prisma.grupo.create({
            data: {
                ...groupData,
                admin_created: true,
                clave_materia: claveMateria,
            },
        });

        return { group: newGroup };
    } catch (error) {
        console.error('Error al crear el grupo:', error);
        throw error;
    }
}

export async function updateGroup(req: Request, res: Response) {
    try {
        const groupId = parseInt(req.params.id, 10);
        const updatedData = req.body;
        const claveMateria = updatedData.clave_materia;

        if (!claveMateria) {
            return res.status(400).json({ error: 'La clave de materia es obligatoria' });
        }

        const existingGroup = await prisma.grupo.findUnique({
            where: { id_grupo: groupId },
        });

        if (!existingGroup) {
            const groupData = { ...updatedData, id_grupo: undefined };
            const newGroup = await createGroup(groupData, claveMateria);

            if (newGroup.error) {
                return res.status(400).json({ error: newGroup.error });
            }

            return res.status(201).json({ message: 'Grupo creado correctamente', data: newGroup });
        }

        const updatedGroup = await prisma.grupo.update({
            where: { id_grupo: groupId },
            data: updatedData,
        });

        return res.status(200).json({ message: 'Grupo actualizado correctamente', data: updatedGroup });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el grupo' });
    }
}

export async function groupInfo(req: Request, res: Response) {
    try {
        const groupId = parseInt(req.params.id);
        const group = await prisma.grupo.findUnique({
            where: { id_grupo: groupId },
            include: {
                solicitud: true
            }
        });

        if(!group){
            return res.status(404).json({message: 'Grupo no encontrado.'});
        }

        return res.status(200).json({message: 'Grupo encontrado.', data: group});
    } catch (error) {
        console.error(error);

export async function getRequests(req: Request, res:Response) {
    try{
        const groupId = parseInt(req.params.id, 10);

        const existingRequests = await prisma.solicitud.findMany({
            where: { id_grupo: groupId }
        });

        if(existingRequests.length == 0){
            return res.status(400).json({ error: 'No existe ninguna solicitud para el grupo ingresado' });
        }

        return res.status(200).json(existingRequests);

    } catch(error){
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener las solicitudes' })
    }
}