import { User, UrlVerificationToken } from "../models/user.models.js";
import sendEmail from "../middlewares/sendEmail.middlewares.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../config/classErrors.config.js";
import crypto from "crypto";

// -- VERIFICA CODIGO DE EMAIL --
async function sendEmailCode(email) {
  const verificationToken = crypto.randomBytes(32).toString("hex");

  const user = await User.findOne({ where: { email } });

  await UrlVerificationToken.create({
    userId: user.id,
    token: verificationToken,
    // expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  });

  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();
  const verificationCode = generateCode(); // CODIGO VERIFICACAO

  // REGISTRA CODIGO DO USUARIO NO BANCO
  user.verificationCode = verificationCode;
  await user.save();

  // ENVIA EMAIL
  await sendEmail(email, verificationCode, verificationToken);

  return;
}

// -- VERIFICA CODIGO DE EMAIL --
async function verifyAuthCode(email, code) {
  // VERIFICA CONTA EXISTENTE
  const user = await User.findOne({ where: { email } });

  if (!user) throw new BadRequestError("usuário não encontrado");
  if (user.emailActive) throw new BadRequestError("email já está ativo");
  if (user.verificationCode !== code)
    throw new UnauthorizedError("código informado está incorreto");

  user.verificationCode = null;
  user.emailActive = true;
  await user.save();

  return user;
}

export { verifyAuthCode, sendEmailCode };
