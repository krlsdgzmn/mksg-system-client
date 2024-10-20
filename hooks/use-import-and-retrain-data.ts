import { importAndRetrainData } from "@/actions/visitor-forecast-actions";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "./use-toast";

export const useImportAndRetrainData = () => {
  const { toast } = useToast();

  return useMutation({
    mutationFn: importAndRetrainData,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You have successfully uploaded new data.",
      });
      window.location.reload();
    },
    onError: () => {
      toast({
        title: "Failed",
        description: "Please check the required file and try again.",
      });
    },
  });
};
