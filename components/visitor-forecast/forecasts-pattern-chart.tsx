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

        <Line
          type="linear"
          dataKey="January"
          stroke="#8886d8"
          dot={{ fill: "#8886d8", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="February"
          stroke="#84ca9d"
          dot={{ fill: "#84ca9d", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="March"
          stroke="#ffc660"
          dot={{ fill: "#ffc660", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="April"
          stroke="#ff7302"
          dot={{ fill: "#ff7302", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="May"
          stroke="#387910"
          dot={{ fill: "#387910", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="June"
          stroke="#8886d8"
          dot={{ fill: "#8886d8", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="July"
          stroke="#ff71b4"
          dot={{ fill: "#ff71b4", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="August"
          stroke="#ba70c8"
          dot={{ fill: "#ba70c8", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="September"
          stroke="#6dd0e1"
          dot={{ fill: "#6dd0e1", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="October"
          stroke="#d34f2f"
          dot={{ fill: "#d34f2f", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="November"
          stroke="#9b1fa2"
          dot={{ fill: "#9b1fa2", r: 3 }}
        />
        <Line
          type="linear"
          dataKey="December"
          stroke="#05a9f4"
          dot={{ fill: "#05a9f4", r: 3 }}
        />
      </ComposedChart>
    </ChartContainer>
  );
}
