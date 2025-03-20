import express from "express";
import {
  AlterEmail,
  AlterNameUser,
  AlterPassword,
  AlterPhones,
  DataUser,
  DeleteUser,
} from "../controllers/user.controller.js";

export const alterUser = express.Router();

alterUser.post("/alter-email", AlterEmail);
alterUser.post("/alter-nameUser", AlterNameUser);
alterUser.post("/alter-password", AlterPassword);
alterUser.post("/alter-phone", AlterPhones);
alterUser.get("/", DataUser);
alterUser.delete("/", DeleteUser);
