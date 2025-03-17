import { User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";
import bcrypt from "bcrypt";
import { sendEmailCode } from "./authCode.services.js";

const saltRounds = 10;

// -- CADASTRO DE USUARIO NO BANCO DE DADOS --
async function registerUser(name, lastName, email, password) {
  // VERIFICA CONTA EXISTENTE
  const user = await User.findOne({ where: { email } });
  if (user) throw new BadRequestError("Usuário já cadastrado no nosso sistema");

  const hashPassword = await bcrypt.hash(password, saltRounds); // HASH DA SENHA

  // REGISTRA USUARIO NO BANCO
  const newUser = await User.create({
    name,
    lastName,
    email,
    password: hashPassword,
    emailActive: false,
  });

  await sendEmailCode(email);

  return newUser;
}

async function loginUser(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw new BadRequestError("usuário não encontrado em nosso sistema");

  const passwordVerified = await bcrypt.compare(password, user.password);
  if (!passwordVerified) throw new BadRequestError("senha incorreta");

  return user;
}

export { registerUser, loginUser };
