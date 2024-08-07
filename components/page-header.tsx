export default function PageHeader({
  header,
  subheader,
  filters,
}: {
  header: string;
  subheader: string;
  filters: React.ReactNode;
}) {
  return (
    <section className="md: flex flex-col justify-between pt-4 md:flex-row md:items-end">
      <div>
        <h1 className="text-lg font-bold md:text-xl">{header}</h1>
        <h2 className="text-sm font-medium text-muted-foreground md:text-base">
          {subheader}
        </h2>
      </div>
      {filters}
    </section>
  );
}
