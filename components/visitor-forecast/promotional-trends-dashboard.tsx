"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { MONTH } from "@/constants/order-prediction";
import {
  useGetPromotionalMetrics,
  useGetPromotionalTrends,
} from "@/hooks/use-promotional-trends";
import { Info, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PromotionalTrendsBarChart from "./promotional-trends-bar-chart";
import PromotionalTrendsChart from "./promotional-trends-chart";

const monthToday = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
  new Date(),
);

export default function PromotionalTrendsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(monthToday);

  const { data, mutate, isPending } = useGetPromotionalTrends();
  const {
    data: metricsData,
    mutate: metricsMutate,
    isPending: isLoading,
  } = useGetPromotionalMetrics();

  useEffect(() => {
    mutate(selectedMonth);
    metricsMutate(selectedMonth);
  }, [selectedMonth, mutate, metricsMutate]);

  let metrics: any = [];
  if (data && !isPending && metricsData && !isLoading) {
    metrics = [
      {
        name: "Avg. Page Views on Non-Promo Days",
        info: "Average hourly page views during non-promotional periods",
        value: Math.round(metricsData.non_promo),
      },
      {
        name: "Avg. Page Views on Promo Days",
        info: "Average hourly page views during promotional periods",
        value: Math.round(metricsData.events_promo),
      },
      {
        name: "Highest Performing Event",
        info: "The promotional event that resulted in the highest increase in page views",
        value: metricsData.highest_event,
      },
      {
        name: "Event Impact Percentage",
        info: "Percentage increase in page views during promotions",
        value: metricsData.percentage.toFixed(2),
        isLast: true,
      },
    ];
  }

  return (
    <main className="space-y-2 py-2 xl:space-y-4 xl:py-4">
      <div className="min-h-[655px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10">
        <header className="flex flex-col border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="pt-2 text-xs text-muted-foreground sm:text-sm">
              Average Promotional Trends in Hourly Page Views
            </h2>
            <h3 className="text-base font-semibold sm:text-xl">
              Promotional Trends During {selectedMonth} Promo
            </h3>
          </div>

          <Select
            defaultValue={monthToday}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="col-span-3 max-w-[130px] bg-background">
              <SelectValue placeholder={selectedMonth} />
            </SelectTrigger>

            <SelectContent>
              {MONTH.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </header>

        {/* Metrics Section */}
        {data && !isPending && (
          <section
            className={`${data && "border-b"} grid min-h-[100px] grid-cols-2 items-center xl:grid-cols-4 xl:gap-8`}
          >
            {metrics.map((item: any) => (
              <div
                key={item.name}
                className={`${item.isLast && "border-none"} flex h-[70%] min-h-[75px] min-w-[200px] flex-col justify-center xl:border-r`}
              >
                <h1 className="flex items-center gap-1.5 pb-1 text-[8px] font-semibold text-muted-foreground sm:text-[10px]">
                  <span className="uppercase">{item.name}</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Info
                          size={16}
                          className="fill-muted-foreground text-card"
                        />
                      </TooltipTrigger>

                      <TooltipContent className="bg-muted-foreground text-white">
                        <p className="text-xs">{item.info}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </h1>

                <p className="text-base font-semibold sm:text-xl">
                  {item.value.toString()}
                  {item.isLast && "%"}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Render Data */}
        {isPending && <LoadingSection />}
        {data && metricsData && !isPending && !isLoading && (
          <>
            <section className="grid gap-4 pt-4 xl:grid-cols-7">
              <div className="rounded-sm border border-border p-4 shadow-sm dark:bg-muted-foreground/5 xl:col-span-4">
                <PromotionalTrendsChart data={data} />
              </div>
              <div className="rounded-sm border border-border p-4 shadow-sm dark:bg-muted-foreground/5 xl:col-span-3">
                <PromotionalTrendsBarChart data={data} />
              </div>
            </section>

            <section className="pt-4 text-sm text-muted-foreground">
              <p>{metricsData.intepretation}</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

function LoadingSection() {
  return (
    <section className="flex min-h-[500px] w-full items-center justify-center">
      <Loader2 size={32} className="animate-spin" />
    </section>
  );
}
