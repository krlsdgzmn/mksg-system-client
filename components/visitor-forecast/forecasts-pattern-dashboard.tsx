"use client";

import { SlidersHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import ForecastsPatternChart from "./forecasts-pattern-chart";
import { useState } from "react";
import {
  ForecastsPattern,
  forecastsPatternData,
} from "@/constants/forecasts-pattern";
import { Checkbox } from "../ui/checkbox";

const months: (keyof ForecastsPattern)[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function ForecastsPatternDashboard() {
  // Initialize filters to include all months by default
  const [filters, setFilters] = useState<string[]>(months);

  const handleClearFilters = () => {
    setFilters([]);
  };

  const handleFilterChange = (month: string, isChecked: boolean) => {
    setFilters((prevFilters) =>
      isChecked
        ? [...prevFilters, month]
        : prevFilters.filter((m) => m !== month),
    );
  };

  // Filter data based on selected months
  const filteredData = forecastsPatternData.map((entry) => {
    const filteredEntry: ForecastsPattern = {
      hour: entry.hour,
      January: 0,
      February: 0,
      March: 0,
      April: 0,
      May: 0,
      June: 0,
      July: 0,
      August: 0,
      September: 0,
      October: 0,
      November: 0,
      December: 0,
    };

    months.forEach((month) => {
      filteredEntry[month] = filters.includes(month) ? entry[month] : 0;
    });

    return filteredEntry;
  });

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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <SlidersHorizontal size={14} /> Filters
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="ml-8 w-64 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
              align="end"
            >
              <DropdownMenuLabel className="flex items-center justify-between py-0">
                <span>Filters</span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={handleClearFilters}
                >
                  Clear
                </Button>
              </DropdownMenuLabel>

              <DropdownMenuSeparator className="mx-0.5 bg-border" />

              <h1 className="ml-2 text-sm font-medium">Month</h1>
              <div className="mx-2 grid w-full grid-cols-2 gap-y-2 py-2">
                {months.map((month) => (
                  <div className="flex items-center gap-1.5" key={month}>
                    <Checkbox
                      id={month}
                      checked={filters.includes(month)}
                      onCheckedChange={(isChecked) =>
                        handleFilterChange(month, Boolean(isChecked))
                      }
                    />
                    <label
                      htmlFor={month}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {month}
                    </label>
                  </div>
                ))}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <ForecastsPatternChart data={filteredData} />
      </div>
    </main>
  );
}
