import express from "express";
import { authRoutes } from "./src/routes/authRoutes.routes.js";

export const app = express();

app.use('/api/auth', authRoutes)

