import {
  getPromotionalMetrics,
  getPromotionalTrends,
  PromotionalMetrics,
  PromotionalTrends,
} from "@/actions/promotional-trends-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const QUERY_KEY = "promotional-trends";

export const useGetPromotionalTrends = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getPromotionalTrends,
    onSuccess: (data: PromotionalTrends) => {
      queryClient.setQueryData([QUERY_KEY], data);
    },
  });
};

export const useGetPromotionalMetrics = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: getPromotionalMetrics,
    onSuccess: (data: PromotionalMetrics) => {
      queryClient.setQueryData([QUERY_KEY], data);
    },
  });
};
