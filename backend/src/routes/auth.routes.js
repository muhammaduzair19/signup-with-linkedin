import express from "express";
import { getUser, linkedInCallback } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.get("/callback", linkedInCallback);
authRoutes.get("/user", getUser);

export default authRoutes;
