import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFilteredOrderForecast, getOrderForecast } from "./actions";
import { OrderForecast } from "./types";

const QUERY_KEY = "order-forecast";

// Custom hook to fetch order forecasts without filters
export const useGetOrderForecast = () => {
  return useQuery<OrderForecast[]>({
    queryKey: [QUERY_KEY],
    queryFn: getOrderForecast,
    staleTime: 1000 * 60,
  });
};

// Custom hook to fetch order forecasts with filters using mutation
export const useFilteredOrderForecast = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getFilteredOrderForecast,
    onSuccess: (data: OrderForecast[]) => {
      queryClient.setQueryData([QUERY_KEY], data);
    },
  });
};
