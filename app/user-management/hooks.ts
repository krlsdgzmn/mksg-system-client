import { useQuery } from "@tanstack/react-query";
import { User } from "../providers";
import { getUsers } from "./actions";

const QUERY_KEY = "user";

export const useGetUsers = () => {
  return useQuery<User[]>({
    queryKey: [QUERY_KEY],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 1,
  });
};
