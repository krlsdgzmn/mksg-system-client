import { cn } from "@/lib/utils";

export default function PageHeader({
  header,
  subheader,
  button,
  className,
}: {
  header: string;
  subheader: string;
  button?: React.ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col justify-between pt-4 md:flex-row md:items-end",
        className,
      )}
    >
      <div>
        <h1 className="bg-gradient-to-b from-black/60 to-black bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-white/70 md:text-xl">
          {header}
        </h1>
        <h2 className="text-sm font-medium text-muted-foreground md:text-base">
          {subheader}
        </h2>
      </div>
      {button}
    </section>
  );
}
