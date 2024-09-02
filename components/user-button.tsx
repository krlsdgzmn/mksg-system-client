import { LogOut, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import AccountSettings from "./account-settings";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useToast } from "./ui/use-toast";

export default function UserButton({ signOut }: { signOut: () => void }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleSignOut = () => {
    signOut();
    toast({
      title: "Success",
      description: "You have successfully signed out.",
    });
    router.push("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full text-xs">
          <User2 size={18} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="flex flex-col bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
      >
        <AccountSettings />

        <Button onClick={handleSignOut} variant="ghost">
          <div className="flex w-full items-center gap-4">
            <LogOut size={14} /> Sign Out
          </div>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
