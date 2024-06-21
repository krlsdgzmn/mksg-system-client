import { cn } from "@/lib/utils";
import { KPICardProps } from "@/types";

export default function KPICard({
  title,
  value,
  description,
  span,
  color,
}: KPICardProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded border bg-card pb-2 shadow sm:col-span-1",
        span,
      )}
    >
      <div className={cn("py-0.5 md:py-[0.185rem]", color)} />
      <h1 className="px-4 pt-2 text-xs font-semibold text-foreground/80 md:text-[0.9rem]">
        {title}
      </h1>
      <h2 className="px-4 pb-1 text-xl font-bold md:text-2xl">{value}</h2>
      <p className="px-4 text-xs text-foreground/50 md:text-[0.85rem]">
        {description}
      </p>
    </div>
  );
}
