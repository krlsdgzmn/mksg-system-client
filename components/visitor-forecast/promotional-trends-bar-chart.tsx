import { PromotionalTrends } from "@/actions/promotional-trends-actions";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";

type PromotionalEvent = "End-Month" | "Mid-Month" | "Monthly Promo";

const chartConfig: Record<PromotionalEvent, { label: string; color: string }> =
  {
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

interface TransformedData {
  name: PromotionalEvent;
  average: number;
}

export default function PromotionalTrendsBarChart({
  data,
}: {
  data: PromotionalTrends;
}) {
  // Compute the average for each category
  const transformedData: TransformedData[] = (
    Object.keys(data) as PromotionalEvent[]
  ).map((key) => ({
    name: key,
    average: parseFloat(
      (
        Object.values(data[key]).reduce((sum, value) => sum + value, 0) /
        Object.values(data[key]).length
      ).toFixed(2),
    ),
  }));

  // Calculate the maximum value for better y-axis scaling
  const maxValue = Math.max(...transformedData.map((item) => item.average));
  const yAxisDomain = [0, Math.ceil(maxValue * 1.1)]; // Add 10% padding

  return (
    <ChartContainer
      config={chartConfig}
      className="aspect-auto h-[350px] w-full"
    >
      <BarChart
        margin={{
          top: 12,
          bottom: 22,
          left: 12,
          right: 12,
        }}
        data={transformedData}
      >
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          tickMargin={10}
          minTickGap={32}
          label={{
            value: "Promotional Events",
            position: "insideBottom",
            offset: -15,
          }}
          opacity={0.75}
        />
        <YAxis
          domain={yAxisDomain}
          tickMargin={10}
          minTickGap={32}
          label={{
            value: "Average Page Views (Count)",
            angle: -90,
            position: "insideLeft",
            style: { textAnchor: "middle" },
          }}
          opacity={0.75}
        />
        <ChartTooltip content={<ChartTooltipContent hideIndicator />} />
        <Bar dataKey="average" barSize={50} radius={[5, 5, 0, 0]}>
          {transformedData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartConfig[entry.name].color} />
          ))}
          <LabelList
            dataKey="average"
            position="top"
            offset={5}
            className="fill-muted-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
