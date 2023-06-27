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

export const signup = async (data) => {
  let response;

  try {
    response = await api.post("register", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const signout = async (data) => {
  let response;

  try {
    response = await api.post("logout", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getBlogs = async (data) => {
  let response;

  try {
    response = await api.get("blog/all", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const createBlog = async (data) => {
  let response;

  try {
    response = await api.post("blog/create", data);
  } catch (error) {
    return error;
  }

  return response;
};