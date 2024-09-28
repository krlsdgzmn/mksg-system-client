import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: ContainerProps) {
  return (
    <div
      className={cn(
        "container min-h-[85vh] w-full max-w-screen-2xl p-4 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
