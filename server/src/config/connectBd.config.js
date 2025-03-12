import database from "./database.config.js";
import { User } from "../models/user.models.js";

export const connectBd = async () => {
  try {
    await database.authenticate();
    console.log("✅ Conexão com o MySQL estabelecida!");

    await database.sync({ force: false });
    // await database.sync({ alter: true });
    console.log("📦 Modelos sincronizados com o banco de dados.");
  } catch (error) {
    console.error("❌ Erro ao conectar ao banco:", error);
    process.exit(1);
  }
};
