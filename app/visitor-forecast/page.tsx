"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { visitorForecastData } from "@/lib/visitor-forecast-data";
import { Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import VisitorsChart from "./_components/visitors-chart";
import { VisitorsForecast } from "./type";

const dateFilters = ["24H", "3D", "7D"];

const visitorsData: VisitorsForecast[] = visitorForecastData;

export default function VisitorForecastPage() {
  const { data: user, isLoading } = useAuth();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [toggle, setToggle] = useState("24H");
  const [visitorForecasts, setVisitorForecasts] =
    useState<VisitorsForecast[]>(visitorsData);

  const handleDateFilter = (date: string) => {
    setToggle(date);

    const filteredData = visitorsData.filter((item) => {
      const itemDate = new Date(item.datetime);
      const today = new Date("2024-08-30 00:00:00");

      today.setHours(0, 0, 0, 0);

      switch (date) {
        case "24H":
          // Filter only for today's data (24 hours)
          return (
            itemDate >= today &&
            itemDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
          );

        case "3D":
          // Filter for data in the next 3 days (including today)
          return (
            itemDate >= today &&
            itemDate < new Date(today.getTime() + 3 * 24 * 60 * 60 * 1000)
          );

        case "7D":
          // Filter for data in the next 7 days (including today)
          return (
            itemDate >= today &&
            itemDate < new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)
          );

        default:
          // Default to 24H if no valid option is provided
          return (
            itemDate >= today &&
            itemDate < new Date(today.getTime() + 24 * 60 * 60 * 1000)
          );
      }
    });

    setVisitorForecasts(filteredData);
  };

  useEffect(() => {
    if (!isLoading) {
      setCheckedAuth(true);
      handleDateFilter("24H"); // Set default to "24H" on page load
    }
  }, [isLoading]);

  if (isLoading || !checkedAuth) return <Loader />;

  if (!user) {
    return (
      <ShieldAlert
        header="Please sign in to continue."
        subheader="The page you're trying to access requires authentication."
      />
    );
  }

  const metrics = [
    {
      name: "Total Visitors",
      info: "Projected total number of visitors expected throughout the selected timeline.",
      value: visitorForecasts.reduce((sum, v) => sum + v.value, 0),
    },
    {
      name: "Current Hour Visitors",
      info: "Projected number of visitors expected in the current hour.",
      value:
        visitorForecasts.find(
          (item) =>
            new Date(item.datetime).getHours() === new Date().getHours(),
        )?.value || 0,
    },
    {
      name: "Next Hour Visitors",
      info: "Projected number of visitors expected in the next hour.",
      value:
        visitorForecasts.find(
          (item) =>
            new Date(item.datetime).getHours() === new Date().getHours() + 1,
        )?.value || 0,
    },
    {
      name: "Peak Visitors Today",
      info: "The maximum number of visitors expected during the peak hour of the day.",
      value: Math.max(...visitorForecasts.map((v) => v.value)),
    },
    {
      name: "Peak Hour Today",
      info: "The hour of the day expected to have the highest number of visitors.",
      value: visitorForecasts.find(
        (item) =>
          item.value === Math.max(...visitorForecasts.map((v) => v.value)),
      )
        ? new Date(
            visitorForecasts.find(
              (item) =>
                item.value ===
                Math.max(...visitorForecasts.map((v) => v.value)),
            )!.datetime,
          ).getHours()
        : 0,
      isLast: true,
      isTime: true,
    },
  ];

  return (
    <Container className="flex min-h-[85vh] flex-col items-center overflow-auto">
      <main className="w-full">
        {/* Header Section */}
        <PageHeader
          header="Visitor Forecasting Dashboard"
          subheader="Hourly Visitor Traffic Predictions"
        />
        <section className="space-y-2 py-2 xl:space-y-4 xl:py-4">
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

              <ToggleGroup
                type="single"
                value={toggle}
                defaultValue="24H"
                onValueChange={(val) => {
                  val && handleDateFilter(val);
                }}
                className="w-fit py-2"
              >
                {dateFilters.map((item) => (
                  <ToggleGroupItem
                    key={item}
                    value={item}
                    className="text-xs font-semibold text-muted-foreground data-[state=on]:bg-blue-50 data-[state=on]:text-blue-500 dark:data-[state=on]:bg-blue-500/10 dark:data-[state=on]:text-blue-50 sm:text-sm"
                  >
                    {item}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </header>

            {/* Metrics Section */}
            <section className="grid min-h-[100px] grid-cols-2 items-center border-b xl:grid-cols-5 xl:gap-8">
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

            {/* Visitor Chart Section */}
            <VisitorsChart data={visitorForecasts} />
          </div>
        </section>
      </main>
    </Container>
  );
}
