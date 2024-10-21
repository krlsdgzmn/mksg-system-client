import { createClient } from "@/utils/supabase/server";
import { User2 } from "lucide-react";
import Image from "next/image";
import MobileMenu from "./mobile-menu";
import NavigationLinks from "./navigation-links";
import { ToggleTheme } from "./toggle-theme";
import SignOutButton from "./auth/sign-out-button";

export default async function Header() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="top-0 z-50 flex w-full justify-center border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center justify-center gap-3">
          <Image
            src="/logo.png"
            alt="Logo"
            className="hidden h-8 w-8 dark:invert md:block"
            width={32}
            height={32}
            priority
            quality={100}
          />
          <NavigationLinks user={user} />
          {user !== null && <MobileMenu user={user} />}
        </div>

        <div className="flex items-center gap-1 text-xs md:text-sm">
          {user !== null && (
            <>
              <div className="flex items-center gap-2 rounded-full p-2">
                <User2 size={14} /> {user?.user_metadata.first_name}
              </div>
              <div className="h-8 border-r" />
            </>
          )}

          <ToggleTheme />
          {user !== null && <SignOutButton />}
        </div>
      </div>
    </header>
  );
}
