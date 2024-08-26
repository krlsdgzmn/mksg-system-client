import { User } from "../providers";

const AUTH_API = process.env.NEXT_PUBLIC_AUTH_API as string;

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${AUTH_API}user/`);
  const data = await response.json();
  return data;
};
