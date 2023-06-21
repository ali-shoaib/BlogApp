import axios from "axios";
import { FRONTEND_INTERNAL_API_PATH } from "../config/keys";

const api = axios.create({
  baseURL: FRONTEND_INTERNAL_API_PATH,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  let response;

  try {
    response = await api.post("login", data);
  } catch (error) {
    return error;
  }

  return response;
};