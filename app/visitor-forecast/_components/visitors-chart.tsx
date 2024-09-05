import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { VisitorsForecast } from "../type";

const chartConfig = {
  value: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export default function VisitorsChart({ data }: { data: VisitorsForecast[] }) {
  return (
    <>
      {/* {isLoading && ( */}
      {/*   <div className="mt-2 h-[76.5%] w-full animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30" /> */}
      {/* )} */}

      {/* {user && ( */}
      <ChartContainer
        config={chartConfig}
        className="aspect-auto h-[400px] w-full"
      >
        <BarChart
          accessibilityLayer
          margin={{
            top: 60,
            bottom: 20,
          }}
          data={data}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="datetime"
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
            dataKey="value"
            tickMargin={10}
            minTickGap={32}
            label={{
              value: "Visitors (Count)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
            opacity={0.75}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]}>
            {data.length === 24 && window.innerWidth >= 768 && (
              <LabelList
                position="top"
                offset={6}
                className="fill-muted-foreground"
                fontSize={11}
              />
            )}
          </Bar>
        </BarChart>
      </ChartContainer>
      {/* )} */}
      {/* {!user && !isLoading && ( */}
      {/*   <div className="flex h-[77.5%] w-full items-center justify-center text-sm font-medium text-muted-foreground"> */}
      {/*     No data found */}
      {/*   </div> */}
      {/* )} */}
    </>
  );
}
