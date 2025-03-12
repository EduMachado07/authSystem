import { registerUser } from "../services/authService.js";

async function Register(req, res, next) {
  try {
    const { name, lastName, email, password } = req.body;
    const newUser = await registerUser(name, lastName, email, password);
    res.status(201).json({ message: "usuário criado", newUser });
  } catch (error) {
    // console.log(error);
    // ENVIA ERRO PARA O MIDDLEWARE DE TRATAMENTO DE ERROS
    next(error);
  }
}

async function Login(req, res) {
  res.send("rota de registro");
}

export { Register, Login };
