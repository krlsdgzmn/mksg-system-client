import { getVisitorForecasts } from "@/actions/visitor-forecast-actions";
import { VisitorForecast } from "@/types/visitor-forecast-response";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEY = "visitor-forecast";

export const useGetVisitorForecasts = () => {
  return useQuery<VisitorForecast[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getVisitorForecasts(),
    staleTime: 1000 * 60 * 5,
  });
};
