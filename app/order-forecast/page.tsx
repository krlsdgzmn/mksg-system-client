"use client";

import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { useAuth } from "../hooks";
import DataFilters from "./_components/data-filters";
import DistanceChart from "./_components/distance-chart";
import DistributionChart from "./_components/distribution-chart";
import KPISection from "./_components/kpi-section";
import MonthChart from "./_components/month-chart";
import OrderStatusTable from "./_components/order-status-table";
import WeekChart from "./_components/week-chart";
import { useGetOrderForecast } from "./hooks";

export default function OrderForecastingDashboard() {
  const { data, isLoading, isError, refetch } = useGetOrderForecast();
  const { toast } = useToast();
  const { data: user } = useAuth();

  const totalOrders = data ? data.length : 0;
  const completedOrders = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledOrders = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to fetch data",
        description: "Please reload the page",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  if (user)
    return (
      <Container className="flex min-h-[86vh] flex-col items-center overflow-auto">
        <main className="w-full">
          <PageHeader
            header="Order Forecasting Dashboard"
            subheader="Forecasts for Order Management and Fulfillment"
            button={<DataFilters />}
          />
          <div className="grid w-full gap-2 py-2 xl:grid-cols-8 xl:gap-4 xl:py-4">
            {/* Left side */}
            <section className="space-y-2 xl:col-span-5 xl:space-y-4">
              <KPISection
                totalOrders={totalOrders}
                completedOrders={completedOrders}
                cancelledOrders={cancelledOrders}
              />
              <MonthChart data={data} isLoading={isLoading} />
              <OrderStatusTable
                data={data}
                isLoading={isLoading}
                refetch={refetch}
              />
            </section>

            {/* Right side */}
            <section className="space-y-2 xl:col-span-3 xl:space-y-4">
              <DistributionChart
                totalOrders={totalOrders}
                completedOrders={completedOrders}
                cancelledOrders={cancelledOrders}
                isLoading={isLoading}
              />
              <DistanceChart data={data} isLoading={isLoading} />
              <WeekChart data={data} isLoading={isLoading} />
            </section>
          </div>
        </main>
      </Container>
    );
}
