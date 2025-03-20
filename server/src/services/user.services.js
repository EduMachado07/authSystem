import { Phone, User } from "../models/user.models.js";
import { BadRequestError } from "../config/classErrors.config.js";

async function newNameUser(req, res, next) {
  try {
    const { email, nameUser } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");

    user.nameUser = nameUser;
    await user.save();

    return user;
  } catch (error) {
    next(error);
  }
}
async function newEmail(req, res, next) {
  try {
    const { email, newEmail } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");

    user.email = newEmail;
    await user.save();

    return user;
  } catch (error) {
    next(error);
  }
}
async function newPassword(req, res, next) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");

    const newHashPassword = await bcrypt.hash(
      password,
      process.env.SALT_ROUNDS
    ); // HASH DA SENHA

    user.password = newHashPassword;
    await user.save();

    return user;
  } catch (error) {
    next(error);
  }
}
async function newPhones(req, res, next) {
  try {
    const { email, firstPhoneNumber, secondPhoneNumber } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");

    const phone = await Phone.findOne({
      where: { userId: user.id },
    });

    phone.phoneNumber = firstPhoneNumber;
    phone.phoneNumber = secondPhoneNumber;
    await user.save();

    return user;
  } catch (error) {
    next(error);
  }
}
async function getUser(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");
    3;
    return user;
  } catch (error) {
    next(error);
  }
}
async function deleteUser(req, res, next) {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new BadRequestError("usuário não encontrado");

    await Phone.destroy({ where: { userId: user.id } });
    await user.destroy();

    return user;
  } catch (error) {
    next(error);
  }
}
export { newNameUser, newPassword, newEmail, newPhones, getUser, deleteUser };
