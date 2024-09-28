"use client";

import { signOutAction } from "@/actions/auth-actions";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={async () => await signOutAction()}
    >
      <LogOut size={18} />
    </Button>
  );
}
