"use client";

import { User } from "@supabase/supabase-js";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const links = [
  {
    name: "Order Prediction",
    path: "/",
  },
  {
    name: "Visitor Forecast",
    path: "/visitor-forecast",
  },
];

export default function MobileMenu({ user }: { user: User | null }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const path = usePathname();

  return (
    <Sheet onOpenChange={setIsOpen} open={isOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="max-w-[250px]">
        <SheetHeader className="border-b pb-4">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Logo"
              className="block h-8 w-8 dark:invert"
              width={32}
              height={32}
              priority
              quality={100}
            />
            <SheetTitle className="text-left">MKSG</SheetTitle>
          </div>
        </SheetHeader>

        {user && (
          <ul className="flex flex-col space-y-2 py-4 text-sm font-medium">
            {links.map((item) => (
              <li
                key={item.name}
                className={`${
                  path === item.path
                    ? "rounded-md bg-muted-foreground/10 text-gray-950 dark:bg-muted-foreground/20 dark:text-white"
                    : ""
                } items-center justify-center p-1 px-2.5 text-foreground/50 transition-all duration-300 focus-visible:outline-2`}
              >
                <Link onClick={() => setIsOpen(false)} href={item.path}>
                  {item.name}
                </Link>
              </li>
            ))}

            {user.user_metadata.role === "Admin" ||
            user.user_metadata.role === "Owner" ? (
              <li
                className={`${
                  path === "/user-management"
                    ? "rounded-md bg-muted-foreground/10 text-gray-950 dark:bg-muted-foreground/20 dark:text-white"
                    : ""
                } items-center justify-center p-1 px-2.5 text-foreground/50 transition-colors duration-100 focus-visible:outline-2`}
              >
                <Link onClick={() => setIsOpen(false)} href="/user-management">
                  User Management
                </Link>
              </li>
            ) : null}
          </ul>
        )}
      </SheetContent>
    </Sheet>
  );
}
