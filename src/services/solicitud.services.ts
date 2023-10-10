import { OPEN_OCR_API_KEY } from "../configs/configs";

export async function validarCaptura(imagen: Buffer, expediente: string) {
    const newForm = new FormData();
    const blob = new Blob([imagen]);

    newForm.append("file", blob, "captura.png");
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
        return false;
    }

    return true;
}