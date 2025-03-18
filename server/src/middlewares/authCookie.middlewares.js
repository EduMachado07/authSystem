import jwt from "jsonwebtoken";
import { BadRequestError, UnauthorizedError } from "../config/classErrors.config.js";

const secretAccess = process.env.JWT_SECRET_ACCESS;

async function authCookie(req, res, next) {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) UnauthorizedError('credenciais de autenticação não informadas');

    // VERIFICA O VALOR DO TOKEN
    const decode = jwt.verify(accessToken, secretAccess);

    req.user = decode;

    next();
  } catch (error) {
    next(error);
  }
}
export default authCookie;