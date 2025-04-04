import { BadRequestError } from "../config/classErrors.config.js";
import {
  registerUser,
  loginUser,
  signTokenJwt,
} from "../services/auth.services.js";

async function Register(req, res, next) {
  try {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password)
      throw new BadRequestError("Dados não informados");

    const user = await registerUser(name, lastName, email, password);

    const { accessToken, refreshToken } = await signTokenJwt(email);
    // ENVIA TOKENS COMO COOKIES
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
      sameSite: "Strict",
    });

    res.status(201).json({ message: "usuário criado", user });
  } catch (error) {
    next(error);
  }
}

async function Login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Dados não informados");

    await loginUser(email, password);

    const { accessToken, refreshToken } = await signTokenJwt(email);
    // ENVIA TOKENS COMO COOKIES
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 dias
      sameSite: "Strict",
    });

    res.status(201).json({ message: "usuário entrou no sistema" });
  } catch (error) {
    next(error);
  }
}

export { Register, Login };
