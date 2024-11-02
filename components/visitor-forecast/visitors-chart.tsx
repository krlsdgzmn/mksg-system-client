import { VisitorForecast } from "@/types/visitor-forecast-response";
import {
  Area,
  CartesianGrid,
  ComposedChart,
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

type VisitorsChartProps = {
  data: VisitorForecast[] | undefined;
};

const chartConfig = {
  yhat: {
    label: "Page Views",
  },
} satisfies ChartConfig;

export default function VisitorsChart({ data }: VisitorsChartProps) {
  return (
    <>
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[400px] w-full"
      >
        <ComposedChart
          accessibilityLayer
          margin={{
            top: 60,
            bottom: 20,
            left: 10,
            right: 10,
          }}
          data={data}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="ds"
            tickMargin={10}
            minTickGap={32}
            tickFormatter={(datetime) => {
              const hour = new Date(datetime).getHours();
              return hour.toString().padStart(2, "0");
            }}
            label={{
              value: "Time (Hours)",
              position: "insideBottom",
              offset: -15,
            }}
            opacity={0.75}
          />

          <YAxis
            dataKey="yhat"
            tickMargin={10}
            minTickGap={32}
            label={{
              value: "Page Views (Count)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
            opacity={0.9}
          />

          <ChartTooltip
            content={
              <ChartTooltipContent
                labelFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleString("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    month: "short",
                    year: "numeric",
                    day: "numeric",
                  });
                }}
              />
            }
          />

          <defs>
            <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6B9CDD" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#6B9CDD" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Area
            dataKey="yhat"
            fill="url(#fillCompleted)"
            fillOpacity={0.6}
            stackId="a"
            type="monotone"
          >
            {data?.length === 24 && window.innerWidth >= 768 && (
              <LabelList
                position="top"
                offset={5}
                className="fill-muted-foreground"
                fontSize={12}
              />
            )}
          </Area>
        </ComposedChart>
      </ChartContainer>
    </>
  );
}
