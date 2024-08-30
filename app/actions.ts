import axios from "axios";
import { SignInForm, User } from "./types";

const AUTH_API_KEY = process.env.NEXT_PUBLIC_AUTH_API as string;

export const authSignIn = async (signInForm: SignInForm): Promise<User> => {
  const formData = new FormData();
  formData.append("username", signInForm.username);
  formData.append("password", signInForm.password);

  const response = await axios.post(`${AUTH_API_KEY}token/`, formData);

  axios.defaults.headers.common["Authorization"] =
    `Bearer ${response.data.access_token}`;
  localStorage.setItem("token", response.data.access_token);
  return response.data.user;
};

export const authSignOut = () => {
  delete axios.defaults.headers.common["Authorization"];
  localStorage.removeItem("token");
};

export const authVerifyToken = async (): Promise<User> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found, user is not authenticated");
  }
  const response = await axios.get(`${AUTH_API_KEY}verify-token/${token}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.user;
};
