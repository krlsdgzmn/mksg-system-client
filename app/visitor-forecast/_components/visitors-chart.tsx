import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Area,
  AreaChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import { VisitorForecasts } from "../type";

const chartConfig = {
  value: {
    label: "Visitors",
  },
} satisfies ChartConfig;

export default function VisitorsChart({
  data,
}: {
  data: VisitorForecasts[] | undefined;
}) {
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
        <AreaChart
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
            opacity={0.9}
            // domain={[0, "dataMax"]} // Ensures the Y-axis max is the exact maximum data value
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
            <linearGradient id="fillValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0.2} />
            </linearGradient>
          </defs>

          <Area
            dataKey="value"
            fill="url(#fillValue)"
            fillOpacity={0.6}
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
        </AreaChart>
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
