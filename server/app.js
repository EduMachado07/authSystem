import express from "express";
import { authRoute } from "./src/routes/auth.routes.js";
import { alterUser } from "./src/routes/alterUser.routes.js";
import { ErrorMiddleware } from "./src/middlewares/errors.middlewares.js";
import cookieParser from "cookie-parser";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/user", alterUser);

app.use(ErrorMiddleware);
