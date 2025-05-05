import express from "express";
import {
    getUser,
    linkedInCallback,
    SignIn,
} from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.get("/callback", linkedInCallback);
authRoutes.get("/user", getUser);
authRoutes.post("/signin", SignIn);

export default authRoutes;
