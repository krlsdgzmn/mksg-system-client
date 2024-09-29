import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderPrediction } from "@/types/order-prediction-response";
import DeleteOrderPredictionButton from "./delete-order-prediction-button";
import { Loader2 } from "lucide-react";
import OrderPredictButton from "./order-predict-button";

export default function OrderStatusTable({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: OrderPrediction[] | undefined;
}) {
  return (
    <div className="hidden h-[548px] w-full overflow-hidden rounded-md border border-border bg-card px-4 py-4 shadow dark:bg-muted-foreground/10 md:block">
      <header className="flex items-end justify-between border-b pb-2">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Comprehensive Record of All Predictions
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">
            Prediction Logs
          </h2>
        </div>

        <OrderPredictButton />
      </header>

      <section className="remove-scrollbar h-[87%] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow className="h-[73px]">
              <TableHead>ID</TableHead>
              <TableHead className="min-w-[100px]">Price Range</TableHead>
              <TableHead>Discount Range</TableHead>
              <TableHead>Month</TableHead>
              <TableHead>Week</TableHead>
              <TableHead>Distance Range</TableHead>
              <TableHead>Cancel Rate</TableHead>
              <TableHead>Order Status</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>

          {data !== undefined && (
            <TableBody>
              {data.toReversed().map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-semibold text-muted-foreground">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.price_bin}</TableCell>
                  <TableCell>{item.discount_bin}</TableCell>
                  <TableCell>{item.month}</TableCell>
                  <TableCell>{item.week}</TableCell>
                  <TableCell>{item.distance_bin}</TableCell>
                  <TableCell>{item.cancel_rate}%</TableCell>
                  <TableCell>
                    <div
                      className={`${item.order_status === "Completed" ? "bg-completed" : "bg-cancelled"} rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-white`}
                    >
                      {item.order_status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DeleteOrderPredictionButton id={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
        {isLoading && (
          <p className="flex h-3/4 items-center justify-center text-sm font-medium text-muted-foreground">
            <Loader2 className="animate-spin" />
          </p>
        )}
        {!data && !isLoading && (
          <p className="flex h-3/4 items-center justify-center text-sm font-medium text-muted-foreground">
            No data found
          </p>
        )}
        {data && data.length === 0 && (
          <p className="flex h-3/4 items-center justify-center text-sm font-medium text-muted-foreground">
            You have not predicted a record yet
          </p>
        )}
      </section>
    </div>
  );
}
