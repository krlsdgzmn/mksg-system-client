import { User } from "../providers";

const USER_API = process.env.NEXT_PUBLIC_USER_API as string;

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${USER_API}`);
  const data = await response.json();
  return data;
};
