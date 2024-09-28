"use client";

import { User } from "@supabase/supabase-js";
import { Pencil, User2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import UpdateUserForm from "./update-user-form";

type UpdateUserButtonProps = {
  user: User;
};

export default function UpdateUserButton({ user }: UpdateUserButtonProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          title="Edit user"
          variant="ghost"
          className="rounded-none border-r text-blue-500 hover:text-blue-500/90"
        >
          <Pencil size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <User2 size={18} />
            Update User
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to update a user
          </DialogDescription>
        </DialogHeader>

        <UpdateUserForm setIsOpen={setIsOpen} user={user} />
      </DialogContent>
    </Dialog>
  );
}
