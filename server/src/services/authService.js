import { User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";

async function registerUser(name, lastName, email, password) {
  const user = await User.findOne({ where: { email } });
  if (user) throw new BadRequestError("usuário já cadastrado");

  const newUser = await User.create({ name, lastName, email, password });

  return newUser;
}

export { registerUser };
