import { useQuery } from "@tanstack/react-query";
import { getVisitorForecast } from "./actions";
import { VisitorForecasts } from "./type";

const QUERY_KEY = "visitor-forecast";

export const useGetVisitorForecast = () => {
  return useQuery<VisitorForecasts[]>({
    queryKey: [QUERY_KEY],
    queryFn: getVisitorForecast,
    staleTime: 1000 * 60,
    refetchInterval: 1000,
  });
};
