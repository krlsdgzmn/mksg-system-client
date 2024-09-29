import {
  getFilteredOrderPredictions,
  getOrderPredictions,
} from "@/actions/order-prediction-actions";
import { OrderPrediction } from "@/types/order-prediction-response";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "order-forecast";

export const useGetOrderPredictions = () => {
  return useQuery<OrderPrediction[]>({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getOrderPredictions(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useGetFilteredOrderPredictions = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getFilteredOrderPredictions,
    onSuccess: (data: OrderPrediction[]) => {
      queryClient.setQueryData([QUERY_KEY], data);
    },
  });
};
