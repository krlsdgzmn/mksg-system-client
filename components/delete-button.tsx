import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { useState } from "react";

export default function DeleteButton({
  id,
  url,
  refetch,
  button,
}: {
  id: number;
  url: string;
  refetch: () => void;
  button: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);

    try {
      await axios.delete(`${url}${id}/`);
      refetch();
      toast({
        title: "Success",
        description: `You have successfully deleted ID ${id}`,
      });
    } catch (error) {
      toast({
        title: "Failed",
        description: `Failed to to delete id ${id}. Please try again.`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>{button}</DialogTrigger>

      <DialogContent className="max-w-[401px]">
        <DialogHeader className="pt-3 text-left">
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this record ID {id}?
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
            onClick={() => setOpen(false)}
            variant="outline"
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
