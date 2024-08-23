import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { DISTANCE_BIN } from "../constants";
import { OrderForecast } from "../types";

// Transform the data
const transformData = (data: OrderForecast[]) => {
  const transformed = DISTANCE_BIN.map((label) => ({
    distance: label,
    completed: 0,
    cancelled: 0,
  }));

  data.forEach((order) => {
    const binIndex = DISTANCE_BIN.indexOf(order.distance_bin);

    if (binIndex !== -1) {
      if (order.order_status === "Completed") {
        transformed[binIndex].completed++;
      } else if (order.order_status === "Cancelled") {
        transformed[binIndex].cancelled++;
      }
    }
  });

  return transformed;
};

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--completed))",
  },
  cancelled: {
    label: "Cancelled",
    color: "hsl(var(--cancelled))",
  },
} satisfies ChartConfig;

export default function DistanceChart({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: OrderForecast[] | undefined;
}) {
  const transformedData = data ? transformData(data) : [];

  return (
    <div className="max-h-[350px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10 xl:h-full">
      <header className="flex items-end justify-between border-b pb-1">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Completed vs Cancelled
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">Distance</h2>
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

      {isLoading && (
        <div className="mt-3 h-[76.5%] w-full animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30" />
      )}
      {data && (
        <ChartContainer
          config={chartConfig}
          className="mx-auto max-h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            margin={{
              top: 40,
            }}
            data={transformedData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="distance"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Bar
              dataKey="cancelled"
              stackId="a"
              fill="var(--color-cancelled)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="completed"
              stackId="a"
              fill="var(--color-completed)"
              radius={[4, 4, 0, 0]}
            >
              <LabelList
                position="top"
                offset={5}
                className="fill-muted-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      )}
      {!data && !isLoading && (
        <div className="flex h-[76.5%] w-full items-center justify-center text-sm font-medium text-muted-foreground">
          No data found
        </div>
      )}
    </div>
  );
}
