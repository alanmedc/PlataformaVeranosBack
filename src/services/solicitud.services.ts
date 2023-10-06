import { API_KEY } from "../configs/configs";
import { Response, Request } from "express";
const { ocrSpace } = require("ocr-space-api-wrapper");

export async function apiOcr(req: Request, res: Response) {
    try {
        const base64Image = ('data:image/jpg;base64,' + req.body.image);
        const expediente = req.body.expediente;
        const imageText = await ocrSpace(base64Image, { apiKey: API_KEY, language: 'spa', isOverlayRequired: true});
        console.log(imageText);
        const siInscrito = imageText.ParsedResults[0].ParsedText.match('SI, con Recibo pagado');
        const expedienteCaptura = imageText.ParsedResults[0].ParsedText.match(`EXPEDIENTE: '${expediente}'`)
        const validSS = siInscrito[0];
        console.log(validSS);
        console.log(expedienteCaptura);
        if(validSS === 'SI, con Recibo pagado'){
            console.log('ScreenShot valida');
            res.send('Captura de pantalla valida.')
        }else{
            console.log('Sube otra SS.');
            res.send('Sube otra captura de pantalla')
        }
    } catch (error) {
        console.error(error);
    }
}