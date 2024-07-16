"use client";

import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

export default function KPICard({
  title,
  value,
  description,
  span,
  color,
  isLoading,
}: {
  title: string;
  value: number;
  description: string;
  span?: string;
  color: string;
  isLoading: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border bg-card pb-2 shadow transition-all duration-500 ease-in-out sm:col-span-1",
        span,
      )}
    >
      <div className={cn("py-0.5 md:py-[0.185rem]", color)} />
      <h1 className="px-4 pt-2 text-xs font-semibold text-foreground/80 md:text-[0.9rem]">
        {title}
      </h1>
      <h2 className="flex min-h-8 items-center px-4 pb-1 text-xl font-bold md:min-h-9 md:text-2xl">
        {!isLoading && value}
        {isLoading && <LoaderCircle size={20} className="animate-spin" />}
      </h2>
      <p className="px-4 text-xs text-foreground/50 md:text-[0.85rem]">
        {description}
      </p>
    </div>
  );
}
