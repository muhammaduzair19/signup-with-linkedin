import dotenv from "dotenv";

dotenv.config();

export const {
    PORT,
    MONGODB_URI,
    CORSORIGIN,
    JWT_SECRET,
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI,
} = process?.env;
