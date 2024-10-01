"use client";

import { signOutAction } from "@/actions/auth-actions";
import { useToast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";

export default function SignOutButton() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOutAction();
      toast({
        title: "Success",
        description: "You have successfully signed out.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      title="Sign out"
      variant="ghost"
      size="icon"
      className="rounded-full"
      onClick={handleSignOut}
      disabled={isLoading}
    >
      <LogOut size={18} />
    </Button>
  );
}
