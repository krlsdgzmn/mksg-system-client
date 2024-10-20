import { getVisitorLatesEntryDate } from "@/actions/visitor-actual-actions";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "visitor-actual";

export const useGetVisitorActual = () => {
  return useQuery<{ date: string }>({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getVisitorLatesEntryDate(),
    staleTime: 1000 * 60 * 5,
  });
};
