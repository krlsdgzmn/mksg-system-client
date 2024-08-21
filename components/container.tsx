import { cn } from "@/lib/utils";

export default function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "container min-h-screen w-full max-w-screen-2xl px-4 md:px-8",
        className,
      )}
    >
      {children}
    </div>
  );
}
