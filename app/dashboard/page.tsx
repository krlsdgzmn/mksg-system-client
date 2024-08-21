"use client";

import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import DataFilters from "./_components/data-filters";
import DistributionChart from "./_components/distribution-chart";
import KPISection from "./_components/kpi-section";
import { useGetOrderForecast } from "./hooks";

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetOrderForecast();
  const { toast } = useToast();

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to fetch data",
        description: "Please reload the page",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  return (
    <Container>
      <PageHeader
        header="Forecasting Dashboard"
        subheader="Order Fulfillment and Hourly Visitor Forecasts for Management"
        filters={<DataFilters />}
      />

      <main className="grid gap-2 pt-2 xl:grid-cols-8 xl:gap-4 xl:pt-4">
        {/* Left side */}
        <section className="xl:col-span-5">
          <KPISection data={data} />
        </section>

        {/* Right side */}
        <section className="xl:col-span-3">
          <DistributionChart data={data} isLoading={isLoading} />
        </section>
      </main>
    </Container>
  );
}
