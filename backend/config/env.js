import { config } from "dotenv";
import path from "path";

const envPath = path.resolve(import.meta.dirname, `.env.${process.env.NODE_ENV || 'development'}.local`);

config({ path: envPath });

export const { 
        PORT,NODE_ENV,
        DB_URI,
        JWT_SECRET,JWT_EXPIRES_IN,
        ARCJET_KEY,ARCJET_ENV
    } = process.env;