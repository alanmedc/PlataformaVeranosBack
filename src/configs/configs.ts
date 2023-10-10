import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const DATABASE_URL = process.env.DATABASE_URL || "";
export const OPEN_OCR_API_KEY = process.env.OPEN_OCR_API_KEY || "";