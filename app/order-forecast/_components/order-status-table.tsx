import { Button } from "@/components/ui/button";

export default function OrderStatusTable({
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
    <div className="h-[498px] overflow-auto rounded-md border border-border bg-card px-4 py-4 dark:bg-muted-foreground/10">
      <header className="flex items-end justify-between border-b pb-2">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Order Status
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">
            Prediction Table
          </h2>
        </div>

        <Button variant="outline" size="sm">
          Predict Record
        </Button>
      </header>
    </div>
  );
}
