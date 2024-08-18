"use client";

import Image from "next/image";

export default function KPICard({
  title,
  value,
  description,
  icon,
}: {
  title: string;
  value: number;
  description: string;
  icon: string;
}) {
  return (
    <div className="col-span-3 grid grid-cols-6 rounded-md border border-border bg-card p-4 pr-0 dark:bg-muted-foreground/10 md:col-span-1">
      <div className="col-span-4 border-r border-border pr-1.5">
        <h1 className="text-xl font-bold sm:text-2xl">{value}</h1>
        <h2 className="text-xs font-semibold sm:text-sm 2xl:text-base">
          {title}
        </h2>
        <p className="text-[10.5px] text-muted-foreground 2xl:text-xs">
          {description}
        </p>
      </div>
      <div className="col-span-2 flex w-full items-center justify-center">
        <Image
          src={icon}
          alt={title}
          className="dark:brightness-130"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
