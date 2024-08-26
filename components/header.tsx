"use client";

import { useAuth } from "@/app/providers";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedBackground from "./core/animated-background";
import { ToggleTheme } from "./toggle-theme";
import UserButton from "./user-button";

const links = [
  {
    name: "Order Forecast",
    path: "/order-forecast",
  },
  {
    name: "Visitor Forecast",
    path: "/visitor-forecast",
  },
];

export default function Header() {
  const currentPath = usePathname();
  const { data: user, signOut } = useAuth();

  return (
    <header className="top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 md:sticky">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
        <div className="flex items-center justify-center gap-3">
          {/* logo */}
          <Image
            src="/logo.png"
            alt="Logo"
            className="h-8 w-8 dark:invert"
            width={32}
            height={32}
            priority
            quality={100}
          />
          {/* navigation links */}
          {user && (
            <ul className="hidden gap-2 text-sm font-medium text-muted-foreground/95 sm:flex">
              <AnimatedBackground
                defaultValue={currentPath}
                className="rounded-md bg-muted-foreground/10 dark:bg-muted-foreground/20"
                transition={{
                  type: "spring",
                  bounce: 0.2,
                  duration: 0.3,
                }}
              >
                {links.map((item) => (
                  <Link
                    key={item.name}
                    data-id={item.path}
                    href={item.path}
                    className="duration:100 items-center justify-center p-1 px-2.5 text-foreground/50 transition-colors focus-visible:outline-2 data-[checked=true]:text-foreground/90"
                  >
                    {item.name}
                  </Link>
                ))}
              </AnimatedBackground>
            </ul>
          )}
        </div>

        <div className="flex items-center gap-2">
          <ToggleTheme />
          {user && <UserButton signOut={signOut} user={user} />}
        </div>
      </div>
    </header>
  );
}
