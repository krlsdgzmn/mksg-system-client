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

const today = new Date().toISOString().split("T")[0];
const visitorsData = visitorForecastData.filter((item) =>
  item.datetime.startsWith(today),
);

export default function VisitorsChart() {
  return (
    <div className="h-[500px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10">
      <header className="flex items-end justify-between border-b pb-1">
        <div>
          <h2 className="pt-3 text-xs text-muted-foreground sm:text-sm">
            Predictive Insights for Future Visitor Trends
          </h2>
          <h3 className="text-base font-semibold sm:text-xl">
            Visitor Forecasts
          </h3>
        </div>
      </header>

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
    </div>
  );
}
