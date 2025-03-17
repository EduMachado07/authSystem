import { BadRequestError } from "../config/classErrors.config.js";
import { registerUser, loginUser } from "../services/auth.services.js";
import signTokenJwt from "../services/signToken.services.js";

async function Register(req, res, next) {
  try {
    const { name, lastName, email, password } = req.body;
    if (!name || !lastName || !email || !password)
      throw new BadRequestError("Dados do usuário insuficientes");

    await registerUser(name, lastName, email, password);

    const { accessToken, refreshToken } = await signTokenJwt(email);
    // DEFINE TOKEN COMO COOKIE
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600000, // 1 hora
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 604800000, // 7 dias
      sameSite: "Strict",
    });

    res.status(201).json({ message: "usuário criado" });
  } catch (error) {
    next(error);
  }
}

async function Login(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new BadRequestError("Dados do usuário insuficientes");

    await loginUser(email, password);

    const { accessToken, refreshToken } = await signTokenJwt(email);
    // DEFINE TOKEN COMO COOKIE
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 3600000, // 1 hora
      sameSite: "Strict",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV,
      maxAge: 604800000, // 7 dias
      sameSite: "Strict",
    });

    res.status(201).json({ message: "usuário entrou no sistema" });
  } catch (error) {
    next(error);
  }
}

export { Register, Login };
