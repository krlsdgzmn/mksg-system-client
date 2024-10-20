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
import { useGetVisitorActual } from "@/hooks/use-visitor-actual";

export default function VisitorForecastDashboard() {
  const { data, isLoading } = useGetVisitorForecasts();
  const { data: latestEntryDate } = useGetVisitorActual();

  let metrics: any[] = [];
  if (Array.isArray(data) && !isLoading) {
    metrics = [
      {
        name: "Total Visits",
        info: "Projected total number of visits expected throughout the selected timeline.",
        value: data.reduce((sum, v) => sum + v.yhat, 0),
      },
      {
        name: "Current Hour Visits",
        info: "Projected number of visits expected in the current hour.",
        value:
          data.find(
            (item) => new Date(item.ds).getHours() === new Date().getHours(),
          )?.yhat || 0,
      },
      {
        name: "Next Hour Visits",
        info: "Projected number of visits expected in the next hour.",
        value:
          data.find(
            (item) =>
              new Date(item.ds).getHours() === new Date().getHours() + 1,
          )?.yhat || 0,
      },
      {
        name: "Peak Visits Today",
        info: "The maximum number of visits expected during the peak hour of the day.",
        value: Math.max(...data.map((v) => v.yhat)),
      },
      {
        name: "Peak Hour Today",
        info: "The hour of the day expected to have the highest number of visits.",
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
        <section
          className={`${data && "border-b"} grid min-h-[100px] grid-cols-2 items-center xl:grid-cols-5 xl:gap-8`}
        >
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
        </section>

        {data && <VisitorsChart data={data} />}

        {!data && (
          <div className="py-16 text-center text-muted-foreground">
            <h1 className="font-semibold sm:text-lg">
              No Forecasts Found for Today
            </h1>
            <p className="text-sm sm:text-base">
              Consider importing new data to forecast today&apos;s traffic.
            </p>
            <p className="py-2 text-sm font-medium sm:text-base">
              Last Entry Date: {latestEntryDate?.date}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
