import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderForecast } from "../types";
import DeleteForecast from "./delete-forecast";
import PredictRecord from "./predict-record";

export default function OrderStatusTable({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: OrderForecast[] | undefined;
}) {
  return (
    <div className="remove-scrollbar h-[548px] overflow-auto rounded-md border border-border bg-card px-4 py-4 dark:bg-muted-foreground/10">
      <header className="flex items-end justify-between border-b pb-2">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Comprehensive Record of All Forecasts
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">
            Prediction Logs
          </h2>
        </div>

        <PredictRecord />
      </header>

      <section>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Price Range</TableHead>
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
                    <DeleteForecast id={item.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        {isLoading &&
          Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="mt-2 h-[73px] w-full animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30"
            />
          ))}

        {!data && !isLoading && (
          <p className="flex h-[400px] items-center justify-center text-sm font-medium text-muted-foreground">
            No data found
          </p>
        )}
      </section>
    </div>
  );
}
