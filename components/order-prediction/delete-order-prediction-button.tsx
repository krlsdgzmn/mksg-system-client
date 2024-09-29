"use client";

import { deleteOrderPrediction } from "@/actions/order-prediction-actions";
import { useGetOrderPredictions } from "@/hooks/use-order-predictions";
import { useToast } from "@/hooks/use-toast";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

type DeleteOrderPredictionButtonProps = {
  id: number;
};

export default function DeleteOrderPredictionButton({
  id,
}: DeleteOrderPredictionButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useGetOrderPredictions();

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);

    try {
      await deleteOrderPrediction(id);
      refetch();
      toast({
        title: "Success",
        description: `You have successfully deleted an order prediction.`,
      });
    } catch (error) {
      toast({
        title: `${error}`.substring(6),
        description: `Failed to to delete. Please try again.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          title="Delete order prediction"
          variant="outline"
          size="icon"
          className="rounded-full text-red-500 hover:text-red-500/90"
        >
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[400px]">
        <DialogHeader className="pt-3 text-left">
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this order prediction?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            disabled={isLoading}
            onClick={async () => await handleDelete(id)}
          >
            Confirm
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => setIsOpen(false)}
            variant="secondary"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
