import { PromotionalTrends } from "@/actions/promotional-trends-actions";
import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

const chartConfig = {
  "End-Month": {
    label: "End-Month",
  },
  "Mid-Month": {
    label: "Mid-Month",
  },
  "Monthly Promo": {
    label: "Monthly Promo",
  },
} satisfies ChartConfig;

export default function PromotionalTrendsChart({
  data,
}: {
  data: PromotionalTrends;
}) {
  const transformedData = Object.keys(data["End-Month"]).map((hour) => ({
    "End-Month": data["End-Month"][parseInt(hour)],
    "Mid-Month": data["Mid-Month"][parseInt(hour)],
    "Monthly Promo": data["Monthly Promo"][parseInt(hour)],
  }));

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[500px] w-full"
    >
      <ComposedChart
        accessibilityLayer
        margin={{
          top: 62,
          bottom: 22,
          left: 12,
          right: 12,
        }}
        data={transformedData}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          tickMargin={10}
          minTickGap={32}
          tickFormatter={(hour) => hour.toString().padStart(2, "0")}
          label={{
            value: "Time (Hours)",
            position: "insideBottom",
            offset: -15,
          }}
          opacity={0.75}
        />

        <YAxis
          tickMargin={10}
          minTickGap={32}
          label={{
            value: "Page Views (Count)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
          opacity={0.75}
        />

        <ChartTooltip
          content={<ChartTooltipContent labelFormatter={(_) => ""} />}
        />

        <Line
          type="linear"
          dataKey="End-Month"
          stroke="#8886d8"
          dot={{ fill: "#8886d8", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="Mid-Month"
          stroke="#84ca9d"
          dot={{ fill: "#84ca9d", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="Monthly Promo"
          stroke="#ffc660"
          dot={{ fill: "#ffc660", r: 3 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
