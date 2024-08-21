export default function PageHeader({
  header,
  subheader,
  filters,
}: {
  header: string;
  subheader: string;
  filters?: React.ReactNode;
}) {
  return (
    <section className="md: flex flex-col justify-between pt-4 md:flex-row md:items-end">
      <div>
        <h1 className="bg-gradient-to-b from-black/60 to-black bg-clip-text text-lg font-bold text-transparent dark:from-white dark:to-white/70 md:text-xl">
          {header}
        </h1>
        <h2 className="text-sm font-medium text-muted-foreground md:text-base">
          {subheader}
        </h2>
      </div>
      {filters}
    </section>
  );
}
