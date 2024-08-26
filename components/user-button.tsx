import { User } from "@/app/providers";
import { LogOut, Settings, User2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserButton({
  signOut,
  user,
}: {
  signOut: () => void;
  user: User;
}) {
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
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
        className="bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
      >
        <Button
          variant="ghost"
          className="flex w-full items-center gap-2 text-sm"
        >
          <Settings size={14} /> Settings
        </Button>

        <Button
          onClick={handleSignOut}
          variant="ghost"
          className="flex w-full items-center gap-2 text-sm"
        >
          <LogOut size={14} /> Sign Out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
