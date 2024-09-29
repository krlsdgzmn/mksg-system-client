"use client";

import { useGetOrderPredictions } from "@/hooks/use-order-predictions";
import DistanceChart from "./distance-chart";
import DistributionChart from "./distribution-chart";
import KPISection from "./kpi-section";
import MonthChart from "./month-chart";
import OrderStatusTable from "./order-status-table";
import WeekChart from "./week-chart";

export default function OrderPredictionDashboard() {
  const { data, isLoading } = useGetOrderPredictions();

  const totalOrders = data ? data.length : 0;
  const completedOrders = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledOrders = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  return (
    <div className="grid w-full gap-2 py-2 xl:grid-cols-8 xl:gap-4 xl:py-4">
      {/* Left side */}
      <section className="space-y-2 xl:col-span-5 xl:space-y-4">
        <KPISection
          totalOrders={totalOrders}
          completedOrders={completedOrders}
          cancelledOrders={cancelledOrders}
        />
        <MonthChart data={data} isLoading={isLoading} />
        <OrderStatusTable data={data} isLoading={isLoading} />
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
  );
}
