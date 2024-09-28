"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, User2 } from "lucide-react";
import { useState } from "react";
import CreateUserForm from "./create-user-form";

export default function CreateUserButton() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Dialog onOpenChange={setIsOpen} open={isOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-2 flex gap-2 rounded-lg text-xs md:text-sm"
        >
          <Plus size={14} />
          Create User
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <User2 size={18} />
            Create User
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to create a user
          </DialogDescription>
        </DialogHeader>

        <CreateUserForm setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
