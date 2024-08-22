import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash } from "lucide-react";
import { OrderForecast } from "../types";

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

        <Button variant="outline" size="sm">
          Predict Record
        </Button>
      </header>

      <section>
        {data !== undefined && (
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
                  <TableCell>{item.cancel_rate}</TableCell>
                  <TableCell>
                    <div
                      className={`${item.order_status === "Completed" ? "bg-completed" : "bg-cancelled"} rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-white`}
                    >
                      {item.order_status}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full"
                    >
                      <Trash size={15} className="text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </section>
    </div>
  );
}
