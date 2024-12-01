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

  const date = data?.find((item) => new Date(item.ds));

  const peakHourData = data?.find(
    (item) => item.yhat === Math.max(...data?.map((v) => v.yhat)),
  );

  const peakHour = peakHourData ? new Date(peakHourData.ds).getHours() : 0;

  const lowestHourData = data?.find(
    (item) => item.yhat === Math.min(...data?.map((v) => v.yhat)),
  );

  const lowestHour = lowestHourData
    ? new Date(lowestHourData.ds).getHours()
    : 0;

  let metrics: any[] = [];
  if (Array.isArray(data) && !isLoading) {
    metrics = [
      {
        name: "Total Visits",
        info: "Projected total number of visits expected throughout the selected timeline.",
        value: Math.round(data.reduce((sum, v) => sum + v.yhat, 0)),
      },
      {
        name: "Current Hour Visits",
        info: "Projected number of visits expected in the current hour.",
        value: Math.round(
          data.find(
            (item) => new Date(item.ds).getHours() === new Date().getHours(),
          )?.yhat || 0,
        ),
      },
      {
        name: "Next Hour Visits",
        info: "Projected number of visits expected in the next hour.",
        value: Math.round(
          data.find(
            (item) =>
              new Date(item.ds).getHours() === new Date().getHours() + 1,
          )?.yhat || 0,
        ),
      },
      {
        name: "Peak Visits Today",
        info: "The maximum number of visits expected during the peak hour of the day.",
        value: Math.round(Math.max(...data.map((v) => v.yhat))),
      },
      {
        name: "Peak Hour Today",
        info: "The hour of the day expected to have the highest number of visits.",
        value: peakHour,
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
                {item.value.toString().padStart(2, "0")}
                {item.isTime && ":00"}
              </p>
            </div>
          ))}
        </section>

        {data && <VisitorsChart data={data} />}
        {data && date && !isLoading && (
          <div className="mt-4 text-sm text-muted-foreground">
            On{" "}
            {new Date(date.ds).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
            , the peak hour of the day is expected to be at{" "}
            {peakHour.toString().padStart(2, "0")}
            :00, with a forecasted {Math.round(peakHourData?.yhat || 0)} page
            views. Conversely, the lowest activity is anticipated at{" "}
            {lowestHour.toString().padStart(2, "0")}:00, with only{" "}
            {Math.round(lowestHourData?.yhat || 0)} page views. To maximize
            engagement or optimize new marketing initiatives, focus efforts
            around {peakHour}:00, such as scheduling promotions and boosting
            existing campaigns. Conversely, use the downtime at{" "}
            {lowestHour.toString().padStart(2, "0")}:00 for low-priority tasks
            or maintenance activities.
          </div>
        )}

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
