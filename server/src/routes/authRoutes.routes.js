import express from "express";

import { Register, Login } from "../controllers/authController.controllers.js";

export const authRoutes = express.Router();

authRoutes.post("/register", Register);
// authRoutes.post("/login", Register);
