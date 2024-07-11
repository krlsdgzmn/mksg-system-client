import Image from "next/image";
import { ToggleTheme } from "./toggle-theme";

export default function Header() {
  return (
    <header className="top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center justify-center gap-3">
          {/* logo */}
          <Image
            src="logo.svg"
            alt="Logo"
            className="h-32 w-32 dark:invert"
            width={32}
            height={32}
            priority
          />
        </div>

        {/* add nav here */}
        <ToggleTheme />
      </div>
    </header>
  );
}
