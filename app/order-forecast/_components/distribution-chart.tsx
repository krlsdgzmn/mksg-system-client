import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
  completed: {
    label: "Completed",
    color: "hsl(var(--completed))",
  },
  cancelled: {
    label: "Cancelled",
    color: "#hsl(var(--cancelled))",
  },
} satisfies ChartConfig;

export default function DistributionChart({
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
  const completedPercent = totalOrders
    ? (completedOrders / totalOrders) * 100
    : 0;
  const cancelledPercent = totalOrders
    ? (cancelledOrders / totalOrders) * 100
    : 0;

  const distribution_data = [
    {
      order_status: "Completed",
      count: completedOrders,
      percent: parseFloat(completedPercent.toFixed(2)),
      fill: "hsl(var(--completed))",
    },
    {
      order_status: "Cancelled",
      count: cancelledOrders,
      percent: parseFloat(cancelledPercent.toFixed(2)),
      fill: "hsl(var(--cancelled))",
    },
  ];

  return (
    <div className="grid h-[300px] max-h-[300px] grid-cols-6 items-center overflow-hidden rounded-md border border-border bg-card px-4 py-6 pr-0 dark:bg-muted-foreground/10">
      {/* Left side */}
      <div className="col-span-2 h-full border-r border-border">
        <h1 className="pt-3 text-xs text-muted-foreground sm:text-sm">
          Order Status
        </h1>

        <h2 className="text-base font-semibold sm:text-xl">Distribution</h2>

        <hr className="pb-4" />

        <div className="flex items-center gap-2 pb-1">
          <div className="rounded-[0.1rem] bg-completed p-1" />
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>

        <div className="flex items-center gap-2 pb-1">
          <div className="rounded-[0.1rem] bg-cancelled p-1" />
          <p className="text-xs text-muted-foreground">Cancelled</p>
        </div>
      </div>

      {/* Right side */}
      <div className="col-span-4">
        {isLoading && (
          <div className="mx-auto aspect-square max-w-[80%] animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30" />
        )}

        {totalOrders !== 0 && (
          <ChartContainer
            config={chartConfig}
            className="mx-auto h-[250px] w-[90%] sm:w-[290px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={distribution_data}
                dataKey="count"
                nameKey="order_status"
                innerRadius={60}
                strokeWidth={5}
                label={({ payload, ...props }) => {
                  return (
                    <text
                      cx={props.cx}
                      cy={props.cy}
                      x={props.x}
                      y={props.y}
                      textAnchor={props.textAnchor}
                      fontWeight={600}
                      fontSize={11}
                      fill={payload.fill}
                      className="hidden sm:block"
                    >
                      {`${payload.percent}%`}
                    </text>
                  );
                }}
                labelLine={false}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalOrders.toLocaleString()}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        )}

        {!totalOrders && !isLoading && (
          <p className="text-center text-sm font-medium text-muted-foreground">
            No data found
          </p>
        )}
      </div>
    </div>
  );
}
