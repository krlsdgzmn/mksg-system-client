"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { useEffect, useState } from "react";
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
  const { data, isLoading: isLoadingData, refetch } = useGetOrderForecast();
  const [checkedAuth, setCheckedAuth] = useState(false);
  const { data: user, isLoading: isLoadingAuth } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth) {
      setCheckedAuth(true);
    }
  }, [isLoadingAuth]);

  if (isLoadingAuth || !checkedAuth) return <Loader />;

  if (!user) {
    return (
      <ShieldAlert
        header="Please sign in to continue."
        subheader="The page you're trying to access requires authentication."
      />
    );
  }

  const totalOrders = data ? data.length : 0;
  const completedOrders = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledOrders = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  return (
    <Container className="flex min-h-[85vh] flex-col items-center overflow-auto">
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
            <MonthChart data={data} isLoading={isLoadingData} />
            <OrderStatusTable
              data={data}
              isLoading={isLoadingData}
              refetch={refetch}
            />
          </section>

          {/* Right side */}
          <section className="space-y-2 xl:col-span-3 xl:space-y-4">
            <DistributionChart
              totalOrders={totalOrders}
              completedOrders={completedOrders}
              cancelledOrders={cancelledOrders}
              isLoading={isLoadingData}
            />
            <DistanceChart data={data} isLoading={isLoadingData} />
            <WeekChart data={data} isLoading={isLoadingData} />
          </section>
        </div>
      </main>
    </Container>
  );
}
