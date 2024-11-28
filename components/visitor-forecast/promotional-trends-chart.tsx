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
    color: "#D48C8C",
  },
  "Mid-Month": {
    label: "Mid-Month",
    color: "#93C276",
  },
  "Monthly Promo": {
    label: "Monthly Promo",
    color: "#3C82F6",
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
      className="aspect-auto h-[350px] w-full"
    >
      <ComposedChart
        accessibilityLayer
        margin={{
          top: 12,
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
          stroke="#D48C8C"
          dot={{ fill: "#D48C8C", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="Mid-Month"
          stroke="#93C276"
          dot={{ fill: "#93C276", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="Monthly Promo"
          stroke="#3C82F6"
          dot={{ fill: "#3C82F6", r: 3 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
