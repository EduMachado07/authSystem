import { User } from "../models/user.models.js";
import sendEmail from "../middlewares/sendEmail.middlewares.js";
import {
  BadRequestError,
  UnauthorizedError,
} from "../config/classErrors.config.js";

// -- ENVIA UM CODIGO POR EMAIL --
async function sendEmailCode(email) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw new BadRequestError("Usuário não encontrado em nosso sistema");

  const generateCode = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

  const verificationCode = generateCode(); // CODIGO DE VERIFICACAO

  // REGISTRA CODIGO DO USUARIO NO BANCO
  user.verificationCode = verificationCode;
  await user.save();

  // ENVIA EMAIL COM CÓDIGO
  await sendEmail(email, verificationCode);

  return;
}

// -- VERIFICA O CODIGO DO EMAIL --
async function verifyAuthCode(email, code) {
  // VERIFICA CONTA EXISTENTE
  const user = await User.findOne({ where: { email } });

  if (!user) throw new BadRequestError("usuário não encontrado");
  if (user.emailActive) throw new BadRequestError("email já está ativo");
  if (user.verificationCode !== code)
    throw new UnauthorizedError("código informado está incorreto");

  // ATUALIZA USUARIO NO BANCO
  user.verificationCode = null;
  user.emailActive = true;
  await user.save();

  return user;
}

export { verifyAuthCode, sendEmailCode };
