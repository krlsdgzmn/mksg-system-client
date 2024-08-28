import DeleteButton from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { OrderForecast } from "../types";
import PredictRecord from "./predict-record";

export default function OrderStatusTable({
  isLoading,
  data,
  refetch,
}: {
  isLoading: boolean;
  data: OrderForecast[] | undefined;
  refetch: () => void;
}) {
  return (
    <div className="hidden h-[548px] w-full overflow-hidden rounded-md border border-border bg-card px-4 py-4 dark:bg-muted-foreground/10 md:block">
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

      <section className="remove-scrollbar h-[87%] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
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
                    <DeleteButton
                      id={item.id}
                      url={process.env.NEXT_PUBLIC_ORDER_FORECAST_API as string}
                      refetch={refetch}
                      button={
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full text-red-500 hover:text-red-500/90"
                        >
                          <Trash2 size={14} />
                        </Button>
                      }
                    />
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
        {data && data.length === 0 && (
          <p className="flex h-[400px] items-center justify-center text-sm font-medium text-muted-foreground">
            You have not predicted a record yet
          </p>
        )}
      </section>
    </div>
  );
}
