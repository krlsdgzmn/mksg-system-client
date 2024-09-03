import { User } from "../types";

const USER_API = process.env.NEXT_PUBLIC_USER_API as string;

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${USER_API}`);
  return await response.json();
};

export const getUserById = async (id: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_USER_API}${id}/`);
  return await response.json();
};
