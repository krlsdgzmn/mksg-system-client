import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { WEEK } from "@/constants/order-prediction";
import { OrderPrediction } from "@/types/order-prediction-response";
import { Area, AreaChart, CartesianGrid, LabelList, XAxis } from "recharts";

// Transform the data
const transformData = (data: OrderPrediction[]) => {
  const transformed = WEEK.map((label) => ({
    week: label,
    completed: 0,
    cancelled: 0,
  }));

  data.forEach((order) => {
    const weekIndex = WEEK.indexOf(order.week.toString());

    if (weekIndex !== -1) {
      if (order.order_status === "Completed") {
        transformed[weekIndex].completed++;
      } else if (order.order_status === "Cancelled") {
        transformed[weekIndex].cancelled++;
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

export default function WeekChart({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data: OrderPrediction[] | undefined;
}) {
  const transformedData = data ? transformData(data) : [];

  return (
    <div className="max-h-[350px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10 xl:h-full">
      <header className="flex items-end justify-between border-b pb-1">
        <div>
          <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Completed vs Cancelled
          </h1>
          <h2 className="text-base font-semibold sm:text-xl">Week</h2>
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
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart
            accessibilityLayer
            margin={{
              top: 40,
              left: 25,
              right: 25,
            }}
            data={transformedData}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickFormatter={(tick) => `Week ${tick}`}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) => <p>Week {label}</p>}
                />
              }
            />

            <defs>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-completed)"
                  stopOpacity={0.2}
                />
              </linearGradient>
              <linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cancelled)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cancelled)"
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>

            <Area
              dataKey="cancelled"
              fill="url(#fillCancelled)"
              fillOpacity={0.6}
              stroke="var(--color-cancelled)"
              stackId="a"
              type="monotone"
            />
            <Area
              dataKey="completed"
              fill="url(#fillCompleted)"
              fillOpacity={0.6}
              stroke="var(--color-completed)"
              stackId="a"
              type="monotone"
            >
              <LabelList
                position="top"
                offset={5}
                className="fill-muted-foreground"
                fontSize={12}
              />
            </Area>
          </AreaChart>
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
