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
        "overflow-hidden bg-card rounded border pb-2 md:col-span-1 shadow",
        span,
      )}
    >
      <div className={cn("py-0.5 md:py-[0.185rem]", color)} />
      <h1 className="px-4 pt-2 font-semibold text-xs md:text-[0.9rem] text-foreground/80">
        {title}
      </h1>
      <h2 className="px-4 text-xl font-bold pb-1 md:text-2xl">{value}</h2>
      <p className="px-4 text-xs text-foreground/50 md:text-[0.85rem]">
        {description}
      </p>
    </div>
  );
}
