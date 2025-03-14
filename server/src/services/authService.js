import { User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";
import { Resend } from "resend";
import bycrpt from "bcrypt";

const saltRounds = 10;
const resend = new Resend("re_gCnr4R5j_8hsvqyqWM1f9d7Bm1iRYcdCS");

async function registerUser(name, lastName, email, password) {
  // const user = await User.findOne({ where: { email } });
  // if (user) throw new BadRequestError("usuário já cadastrado");

  // const hashPassword = await bycrpt.hash(password, saltRounds);

  const { data, error } = await resend.emails.send({
    from: "Eduardo Machado <eduardo.machado.example.com >",
    to: email,
    subject: "Hello World",
    html: "<strong>It works!</strong>",
  });

  if (error) console.log(error);

  // const newUser = await User.create({ name, lastName, email, hashPassword });

  // return newUser;
}

export { registerUser };
