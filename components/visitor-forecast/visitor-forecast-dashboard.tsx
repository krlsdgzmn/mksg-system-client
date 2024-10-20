"use client";

import { useGetVisitorForecasts } from "@/hooks/use-visitor-forecasts";
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import VisitorsChart from "./visitors-chart";

export default function VisitorForecastDashboard() {
  const { data, isLoading } = useGetVisitorForecasts();

  let metrics: any[] = [];
  if (Array.isArray(data) && !isLoading) {
    metrics = [
      {
        name: "Total Visitors",
        info: "Projected total number of visitors expected throughout the selected timeline.",
        value: data.reduce((sum, v) => sum + v.yhat, 0),
      },
      {
        name: "Current Hour Visitors",
        info: "Projected number of visitors expected in the current hour.",
        value:
          data.find(
            (item) => new Date(item.ds).getHours() === new Date().getHours(),
          )?.yhat || 0,
      },
      {
        name: "Next Hour Visitors",
        info: "Projected number of visitors expected in the next hour.",
        value:
          data.find(
            (item) =>
              new Date(item.ds).getHours() === new Date().getHours() + 1,
          )?.yhat || 0,
      },
      {
        name: "Peak Visitors Today",
        info: "The maximum number of visitors expected during the peak hour of the day.",
        value: Math.max(...data.map((v) => v.yhat)),
      },
      {
        name: "Peak Hour Today",
        info: "The hour of the day expected to have the highest number of visitors.",
        value: data.find(
          (item) => item.yhat === Math.max(...data.map((v) => v.yhat)),
        )
          ? new Date(
              data.find(
                (item) => item.yhat === Math.max(...data.map((v) => v.yhat)),
              )!.ds,
            ).getHours()
          : 0,
        isLast: true,
        isTime: true,
      },
    ];
  }

  return (
    <main className="space-y-2 py-2 xl:space-y-4 xl:py-4">
      <div className="min-h-[600px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10">
        <header className="flex flex-col border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="pt-2 text-xs text-muted-foreground sm:text-sm">
              Predictive Insights for Future Visitor Trends
            </h2>
            <h3 className="text-base font-semibold sm:text-xl">
              Visitor Forecasts
            </h3>
          </div>
        </header>

        {/* Metrics Section */}
        <section className="grid min-h-[100px] grid-cols-2 items-center xl:grid-cols-5 xl:gap-8">
          {metrics.map((item) => (
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
                {item.value}
                {item.isTime && ":00"}
              </p>
            </div>
          ))}

          {data && <VisitorsChart data={data} />}
        </section>

        {!data && (
          <div className="py-16 text-center text-muted-foreground">
            <h1 className="text-lg font-semibold">
              No Forecast Found for Today
            </h1>
            <p>
              Consider importing new data to forecasts today&apos;s traffic.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
