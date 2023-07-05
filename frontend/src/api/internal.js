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

export const getBlogById = async (id) => {
  let response;

  try {
    response = await api.get(`blog/${id}`);
  } catch (error) {
    response = error;
  }

  return response;
};

export const getCommentsById = async (id) => {
  let response;

  try {
    response = await api.get(`comment/${id}`, {
      validateStatus: false,
    });
  } catch (error) {
    return error;
  }

  return response;
};

export const postComment = async (data) => {
  let response;

  try {
    response = await api.post("comment/create", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteBlog = async (id) => {
  let response;
  try {
    response = await api.post(`blog/delete`,id);
  } catch (error) {
    return error;
  }

  return response;
};

export const updateBlog = async (data) => {
  let response;
  try {
    response = await api.put("blog/update", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const resetPassword = async (data) => {
  let response;

  try {
    response = await api.post("reset-password", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const like = async (data) => {
  let response;

  try {
    response = await api.post("like", data);
  } catch (error) {
    return error;
  }

  return response;
};

export const getLikesById = async (id) => {
  let response;

  try {
    response = await api.get(`like/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};