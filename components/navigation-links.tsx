"use client";

import { User } from "@supabase/supabase-js";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinksProps = { user: User | null };

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

export default function NavigationLinks({ user }: NavigationLinksProps) {
  const path = usePathname();

  return (
    <>
      {user && (
        <ul className="hidden gap-2 text-sm font-medium md:flex">
          {links.map((item) => (
            <li key={item.name}>
              <Link
                href={item.path}
                className={`${
                  path === item.path
                    ? "rounded-lg bg-muted-foreground/10 text-gray-950 dark:bg-muted-foreground/20 dark:text-white"
                    : ""
                } items-center justify-center p-1 px-2.5 text-foreground/50 transition-all duration-300 focus-visible:outline-2`}
              >
                {item.name}
              </Link>
            </li>
          ))}

          {user.user_metadata.role === "Admin" ||
          user.user_metadata.role === "Owner" ? (
            <li>
              <Link
                href="/user-management"
                className={`${
                  path === "/user-management"
                    ? "rounded-lg bg-muted-foreground/10 text-gray-950 dark:bg-muted-foreground/20 dark:text-white"
                    : ""
                } items-center justify-center p-1 px-2.5 text-foreground/50 transition-colors duration-100 focus-visible:outline-2`}
              >
                User Management
              </Link>
            </li>
          ) : null}
        </ul>
      )}
    </>
  );
}
