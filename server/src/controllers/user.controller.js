import { BadRequestError } from "../config/classErrors.config.js";
import {
  newPassword,
  newEmail,
  newPhones,
  getUser,
  deleteUser,
  newNameUser,
} from "../services/user.services.js";

async function AlterNameUser(req, res, next) {
  try {
    const { email, nameUser } = req.body;
    if (!email || !nameUser) throw new BadRequestError("Dados não informados");

    const user = await newNameUser(email, nameUser);

    res.status(201).json({ message: "email do usuario alterado", user });
  } catch (error) {
    next(error);
  }
}
async function AlterEmail(req, res, next) {
  try {
    const { email, newEmail } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");

    const user = await newEmail(email, newEmail);

    res.status(201).json({ message: "email do usuario alterado", user });
  } catch (error) {
    next(error);
  }
}
async function AlterPassword(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new BadRequestError("Dados não informados");

    const user = await newPassword(email, password);

    res.status(201).json({ message: "nova senha criada", user });
  } catch (error) {
    next(error);
  }
}
async function AlterPhones(req, res, next) {
  try {
    const { email, firstPhoneNumber, secondPhoneNumber } = req.body;
    if (!email || !firstPhoneNumber || secondPhoneNumber)
      throw new BadRequestError("Dados não informados");

    const user = await newPhones(email, firstPhoneNumber, secondPhoneNumber);

    res.status(201).json({ message: "telefones do usuárrio alterados", user });
  } catch (error) {
    next(error);
  }
}
async function DataUser(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");

    const user = await getUser(email);

    res.status(201).json({ message: "telefones do usuárrio alterados", user });
  } catch (error) {
    next(error);
  }
}
async function DeleteUser(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) throw new BadRequestError("Dados não informados");

    const user = await deleteUser(email);

    res.status(201).json({ message: "telefones do usuárrio alterados", user });
  } catch (error) {
    next(error);
  }
}

export {
  AlterPassword,
  AlterEmail,
  AlterPhones,
  AlterNameUser,
  DataUser,
  DeleteUser,
};
