"use client";

import { deleteUserAction } from "@/actions/auth-actions";
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

type DeleteUserButtonProps = {
  id: string;
};

export default function DeleteUserButton({ id }: DeleteUserButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    setIsLoading(true);

    try {
      await deleteUserAction(id);
      toast({
        title: "Success",
        description: `You have successfully deleted a user.`,
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
          title="Delete user"
          variant="ghost"
          className="rounded-none text-red-500 hover:text-red-500/90"
        >
          <Trash2 size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[400px]">
        <DialogHeader className="pt-3 text-left">
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this user?
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
