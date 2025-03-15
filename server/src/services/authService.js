import { User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";
import sendEmail from "../middlewares/sendEmail.middlewares.js";
import bycrpt from "bcrypt";
import jwt from 'jsonwebtoken';

const saltRounds = 10;
const secretAccess = '360bc09ce54261f3511cb889d4f36051c15a83d3c055e0c698afc7dfe0ba9f6a';
// const secretAccess = process.env.JWT_SECRET_ACCESS;
const secretRefresh = process.env.JWT_SECRET_REFRESH;

async function registerUser(res) {
// async function registerUser(name, lastName, email, password) {
  // const user = await User.findOne({ where: { email } });
  // if (user) throw new BadRequestError("usuário já cadastrado");

  // const hashPassword = await bycrpt.hash(password, saltRounds);

  // const newUser = await User.create({ name, lastName, email, hashPassword });

  const email = 'eduardo';

  const accessToken = jwt.sign({ email }, secretAccess, { expiresIn: "1h" });
  // const refreshToken = jwt.sign({ email }, secretRefresh, { expiresIn: "24h" });

  res.cookie('accessToken', accessToken, {
    httpOnly: true,  // Impede o acesso ao cookie via JavaScript
    secure: process.env.NODE_ENV === 'production',  // Só transmite em HTTPS
    maxAge: 3600000, // 1 hora de validade (mesma duração do accessToken)
    sameSite: 'Strict',  // Previne o envio do cookie em requisições de outros sites
  });

  // res.cookie('refreshToken', refreshToken, {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   maxAge: 86400000, // 24 horas de validade (mesma duração do refreshToken)
  //   sameSite: 'Strict',
  // });
  
  await sendEmail('eduardo.silvamachado07@gmail.com');

  // return newUser;
}

export { registerUser };
