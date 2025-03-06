import axios from "axios";

export const apiBase = axios.create({
  baseURL: "",
  timeout: 6000,
});
