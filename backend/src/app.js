import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { CORSORIGIN } from "./config/config.js";
const app = express();

//CORS
app.use(
    cors({
        origin: CORSORIGIN,
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(cookieParser());

//JSON PARSER
app.use(express.json({ limit: "5mb" }));

//URL ENCODED
app.use(express.urlencoded({ extended: true, limit: "2mb" }));

//FOR STATIC FILES
app.use(express.static("public"));

//routes Import
import authRoutes from "./routes/auth.routes.js";

//configure routes
app.use("/api/v1/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello Im here");
});

export { app };
