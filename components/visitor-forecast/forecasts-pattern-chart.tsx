import { CartesianGrid, ComposedChart, Line, XAxis, YAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import { ForecastsPattern } from "@/constants/forecasts-pattern";

const chartConfig = {
  January: {
    label: "January",
  },
  February: {
    label: "February",
  },
  March: {
    label: "March",
  },
  April: {
    label: "April",
  },
  May: {
    label: "May",
  },
  June: {
    label: "June",
  },
  July: {
    label: "July",
  },
  August: {
    label: "August",
  },
  September: {
    label: "September",
  },
  October: {
    label: "October",
  },
  November: {
    label: "November",
  },
  December: {
    label: "December",
  },
} satisfies ChartConfig;

type ForecastsPatternChartProps = {
  data: ForecastsPattern[];
};

export default function ForecastsPatternChart({
  data,
}: ForecastsPatternChartProps) {
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
        data={data}
      >
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="hour"
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

        {/* Define a Line for each month */}
        <Line type="monotone" dataKey="January" stroke="#8886d8" />
        <Line type="monotone" dataKey="February" stroke="#84ca9d" />
        <Line type="monotone" dataKey="March" stroke="#ffc660" />
        <Line type="monotone" dataKey="April" stroke="#ff7302" />
        <Line type="monotone" dataKey="May" stroke="#387910" />
        <Line type="monotone" dataKey="June" stroke="#8886d8" />
        <Line type="monotone" dataKey="July" stroke="#ff71b4" />
        <Line type="monotone" dataKey="August" stroke="#ba70c8" />
        <Line type="monotone" dataKey="September" stroke="#6dd0e1" />
        <Line type="monotone" dataKey="October" stroke="#d34f2f" />
        <Line type="monotone" dataKey="November" stroke="#9b1fa2" />
        <Line type="monotone" dataKey="December" stroke="#05a9f4" />
      </ComposedChart>
    </ChartContainer>
  );
}
