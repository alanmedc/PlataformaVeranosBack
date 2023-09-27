import { NextFunction, Request, Response } from "express";
import jws from "jsonwebtoken";
import { JWT_SECRET } from "../configs/configs";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
    }
    try {
        const decoded = jws.verify(token, JWT_SECRET);
        (req as any).user = decoded;
        next();
    } catch (error) {
        console.error("Error al verificar el token:", error);
        res.status(401).json({ message: "Token inválido." });
    }
}