import database from "./database.config.js";
import { User } from "../models/user.models.js";

export const connectBd = async () => {
  try {
    await database.authenticate();

    await database.sync({ force: false });
    // await database.sync({ alter: true });

    console.log("--------");
    console.log("✅ Conexão com o MySQL estabelecida!");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    process.exit(1);
  }
};
