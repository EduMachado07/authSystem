import express from "express";

import { Register, Login } from "../controllers/auth.controllers.js";
import {
  SendAuthCode,
  VerifyAuthCode,
} from "../controllers/authCode.controllers.js";
import authCookie from "../middlewares/authCookie.middlewares.js";

export const authRoute = express.Router();

authRoute.post("/register", Register);
authRoute.post("/login", Login);
authRoute.post("/send-code", SendAuthCode);
authRoute.post("/verify-code", VerifyAuthCode);
// teste --
authRoute.post("/route-protected", authCookie, async function(req, res) {
  res.send('usuário credenciado');
});
