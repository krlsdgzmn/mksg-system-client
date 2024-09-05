"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import VisitorsChart from "./_components/visitors-chart";

const dateFilters = ["24H", "3D", "7D"];

export default function VisitorForecastPage() {
  const { data: user, isLoading } = useAuth();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const [toggle, setToggle] = useState("24H");

  useEffect(() => {
    if (!isLoading) {
      setCheckedAuth(true);
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

  return (
    <Container className="flex min-h-[85vh] flex-col items-center overflow-auto">
      <main className="w-full">
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
                onValueChange={(val) => {
                  val && setToggle(val);
                }}
                defaultValue="24H"
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

            <section className="flex h-[100px] items-center border-b">
              Metrics Section Work in Progress (WIP)
            </section>

            <VisitorsChart />
          </div>
        </section>
      </main>
    </Container>
  );
}
