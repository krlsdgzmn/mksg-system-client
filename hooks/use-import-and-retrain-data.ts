import { importAndRetrainData } from "@/actions/visitor-forecast-actions";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";
import { useGetVisitorForecasts } from "./use-visitor-forecasts";

export const useImportAndRetrainData = () => {
  const { refetch } = useGetVisitorForecasts();
  const { toast } = useToast();

  return useMutation({
    mutationFn: importAndRetrainData,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have successfully uploaded new data.",
      });
      refetch();
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Please check the required file and try again.",
      });
    },
  });
};
