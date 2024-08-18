"use client";

import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AnimatedBackground from "./core/animated-background";
import { ToggleTheme } from "./toggle-theme";
import { Button } from "./ui/button";

const links = [
  {
    name: "Overview",
    path: "/overview",
  },
  {
    name: "Order Forecasting",
    path: "/order-forecast",
  },
];

export default function Header() {
  const currentPath = usePathname();

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

          {/* navigation links */}
          <ul className="flex gap-2 text-sm font-medium text-muted-foreground/95">
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
                  className="items-center justify-center p-1 px-2.5 text-foreground/50 transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-foreground/90"
                >
                  {item.name}
                </Link>
              ))}
            </AnimatedBackground>
          </ul>
        </div>

        <div className="flex items-center gap-2">
          <ToggleTheme />

          <Button
            variant="outline"
            size="icon"
            className="rounded-full text-xs"
          >
            <User2 size={18} />
          </Button>
        </div>
      </div>
    </header>
  );
}
