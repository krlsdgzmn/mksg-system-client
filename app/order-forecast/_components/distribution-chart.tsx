"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import { useGetOrderForecast } from "../hooks";

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

export default function DistributionChart() {
  const { data, isLoading } = useGetOrderForecast();

  const totalOrders = data ? data.length : 0;
  const completedCount = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledCount = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  const distribution_data = [
    {
      order_status: "Completed",
      count: completedCount,
      fill: "hsl(var(--completed))",
    },
    {
      order_status: "Cancelled",
      count: cancelledCount,
      fill: "hsl(var(--cancelled))",
    },
  ];

  return (
    <div className="grid min-h-[315px] grid-cols-6 rounded-md border border-border bg-card px-4 py-8 pr-0">
      {/* Left side */}
      <div className="col-span-2 border-r border-border">
        <h1 className="text-xs text-muted-foreground sm:text-sm">
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
          <div className="mx-auto h-full max-w-[80%] animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30" />
        )}

        {data && (
          <ChartContainer
            config={chartConfig}
            className="col-span-4 mx-auto aspect-square max-h-[250px]"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent />} />
              <Pie
                data={distribution_data}
                dataKey="count"
                nameKey="order_status"
                innerRadius={60}
                strokeWidth={5}
                label
                labelLine={false}
                fontWeight={600}
                fontSize={14}
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
      </div>
    </div>
  );
}
