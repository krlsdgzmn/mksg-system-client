import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { visitorForecastData } from "@/lib/visitor-forecast-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

const chartConfig = {
  value: {
    label: "Visitors",
  },
} satisfies ChartConfig;

const today = "2024-08-30"; // new Date().toISOString().split("T")[0];
const visitorsData = visitorForecastData.filter((item) =>
  item.datetime.startsWith(today),
);

export default function VisitorsChart() {
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
            bottom: 16,
          }}
          data={visitorsData}
        >
          <CartesianGrid vertical={false} />

          <XAxis
            dataKey="datetime"
            tickMargin={8}
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
          />

          <YAxis
            dataKey="value"
            tickMargin={8}
            minTickGap={32}
            label={{
              value: "Visitors (Count)",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "middle" },
            }}
          />

          <ChartTooltip content={<ChartTooltipContent />} />

          <Bar dataKey="value" fill="#60A5FA" radius={[4, 4, 0, 0]}>
            {visitorsData.length === 24 && window.innerWidth >= 768 && (
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
