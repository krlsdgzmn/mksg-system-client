import { useQuery } from "@tanstack/react-query";
import { User } from "../types";
import { getUserById, getUsers } from "./actions";

const QUERY_KEY = "user";

export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: [QUERY_KEY],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 1,
  });
};

export const useGetUserById = (id: number) => {
  return useQuery<User>({
    queryKey: [`${QUERY_KEY}_${id}`],
    queryFn: () => getUserById(id),
    staleTime: 1000 * 60 * 1,
    enabled: !!id,
  });
};
