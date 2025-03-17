import express from "express";
import { authRoute } from "./src/routes/authRoutes.routes.js";
import { ErrorMiddleware } from "./src/middlewares/errors.middlewares.js";

export const app = express();

app.use(express.json());

app.use("/api/auth", authRoute);

app.use(ErrorMiddleware);
