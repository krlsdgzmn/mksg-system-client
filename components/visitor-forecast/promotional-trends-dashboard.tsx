"use client";

import { MONTH } from "@/constants/order-prediction";
import { useGetPromotionalTrends } from "@/hooks/use-promotional-trends";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import PromotionalTrendsChart from "./promotional-trends-chart";

const monthToday = new Intl.DateTimeFormat("en-US", { month: "long" }).format(
  new Date(),
);

export default function PromotionalTrendsDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(monthToday);

  const { data, mutate, isPending } = useGetPromotionalTrends();

  useEffect(() => {
    mutate(selectedMonth);
  }, [selectedMonth, mutate]);

  return (
    <main className="space-y-2 py-2 xl:space-y-4 xl:py-4">
      <div className="min-h-[600px] overflow-hidden rounded-md border border-border bg-card p-4 shadow dark:bg-muted-foreground/10">
        <header className="flex flex-col border-b pb-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="pt-2 text-xs text-muted-foreground sm:text-sm">
              Average Promotional Trends in Hourly Page Views
            </h2>
            <h3 className="text-base font-semibold sm:text-xl">
              Promotional Trends by {selectedMonth}
            </h3>
          </div>

          <Select
            defaultValue={monthToday}
            onValueChange={(value) => setSelectedMonth(value)}
          >
            <SelectTrigger className="col-span-3 max-w-[130px]">
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

        {/* Render Data */}
        {isPending && <LoadingSection />}
        {data && !isPending && <PromotionalTrendsChart data={data} />}
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
