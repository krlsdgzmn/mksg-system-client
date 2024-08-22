export default function MonthChart({
  isLoading,
  totalOrders,
  completedOrders,
  cancelledOrders,
}: {
  isLoading: boolean;
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}) {
  return (
    <div className="h-[350px] max-h-[350px] rounded-md border border-border bg-card px-4 py-4 dark:bg-muted-foreground/10 md:h-[400px] md:max-h-[400px]">
      <header className="flex items-end justify-between border-b pb-1">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Completed vs Cancelled
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">Month</h2>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 pb-1">
            <div className="rounded-[0.1rem] bg-completed p-1" />
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          <div className="flex items-center gap-2 pb-1">
            <div className="rounded-[0.1rem] bg-cancelled p-1" />
            <p className="text-xs text-muted-foreground">Cancelled</p>
          </div>
        </div>
      </header>
    </div>
  );
}
