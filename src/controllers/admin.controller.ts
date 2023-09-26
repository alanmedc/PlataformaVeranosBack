import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import  jwt  from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import { JWT_SECRET } from "../configs/configs";
const prisma = new PrismaClient();

export const adminLogin = async (req: Request, res: Response)=> {

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
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({error: 'Faltan datos.'});
        }
        
        const admin = await prisma.admin.findFirst({
            where: {
                username: username,
            },
        });

        if(!admin){
            return res.status(404).json({message: "Admin no encontrado."});
        }

        const isValidPass = bcrypt.compareSync(password, admin.password);

        if(!isValidPass){
            return res.status(400).json({message: "Contraseña no valida."});
        }

        const token = jwt.sign({id: admin.id_admin}, JWT_SECRET);
        
        return res.json({message: "Login correcto.",
                data: token});

    }catch (error) {
        return res.status(500).json({message: "Algo salió mal."});
    }
}