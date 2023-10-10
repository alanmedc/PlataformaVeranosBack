import { Request, Response } from "express";
import { OPEN_OCR_API_KEY } from "../configs/configs";

export async function apiOcr(req: Request, res: Response) {
    const captura = req.file;
    const expediente = req.body.expediente;

    if (!captura) {
        return res.status(400).json({ code: "NO_FILE", message: "No se ha enviado ninguna captura de pantalla." });
    }

    const newForm = new FormData();
    const blob = new Blob([captura.buffer], { type: captura.mimetype });

    newForm.append("file", blob, captura.originalname);
    newForm.append("language", "spa");
    newForm.append("isOverlayRequired", "true");

    const resBody = await fetch("https://api.ocr.space/parse/image", {
        method: "POST",
        body: newForm,
        headers: {
            apikey: OPEN_OCR_API_KEY
        },
    }).then((res) => res.json());

    const text = resBody.ParsedResults[0].ParsedText;

    if (!text.includes(expediente)) {
        return res.status(400).json({ code: "INVALID_FILE", message: "La captura de pantalla no contiene el expediente." });
    }

    return res.status(200).json({ code: "OK", message: "La captura de pantalla es válida." });
}
