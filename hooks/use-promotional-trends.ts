import {
  getPromotionalTrends,
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
