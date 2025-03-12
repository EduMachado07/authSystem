import express from "express";
import { authRoutes } from "./src/routes/authRoutes.routes.js";
import { ErrorMiddleware } from "./src/middlewares/errors.middlewares.js";

export const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use(ErrorMiddleware);
