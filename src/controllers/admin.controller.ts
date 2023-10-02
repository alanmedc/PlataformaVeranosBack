import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
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

        const isValidPass = bcrypt.compareSync(password, admin.password);

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

export async function updateGroup(req: Request, res: Response) {
    try {
        const groupId = parseInt(req.params.id, 10);
        const updatedData = req.body;

        const existingGroup = await prisma.grupo.findUnique({
            where: { id_grupo: groupId },
        });

        if (!existingGroup) {
            return res.status(404).json({ error: 'El grupo no existe' });
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