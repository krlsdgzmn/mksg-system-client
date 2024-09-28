import { getAuthUsersAction } from "@/actions/auth-actions";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "user";

export function useGetUsers() {
  return useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getAuthUsersAction(),
    staleTime: 1000 * 60,
    refetchInterval: 1000,
  });
}
