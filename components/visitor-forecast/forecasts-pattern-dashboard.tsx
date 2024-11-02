"use client";

import ForecastsPatternChart from "./forecasts-pattern-chart";

export default function ForecastsPatternDashboard() {
  return (
    <main className="space-y-2 py-2 xl:space-y-4 xl:py-4">
      <div className="min-h-[600px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10">
        <header className="flex flex-col border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="pt-2 text-xs text-muted-foreground sm:text-sm">
              Monthly Trends in Hourly Page Views
            </h2>
            <h3 className="text-base font-semibold sm:text-xl">
              Average Hourly Page Views by Month
            </h3>
          </div>
        </header>

        <ForecastsPatternChart />
      </div>
    </main>
  );
}
