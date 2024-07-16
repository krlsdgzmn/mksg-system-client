"use client";

import KPICard from "@/components/kpi-card";
import { useGetOrderForecast } from "../hooks";

export default function KPISection() {
  const { data, isLoading } = useGetOrderForecast();

  const totalOrders = data ? data.length : 0;
  const completedOrders = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledOrders = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  return (
    <section className="grid grid-cols-2 gap-2 pt-2 sm:grid-cols-3 md:gap-4 md:pt-4">
      <KPICard
        title="Total Orders"
        value={totalOrders}
        description="Total orders placed"
        span="col-span-2"
        color="bg-foreground"
        isLoading={isLoading}
      />

      <KPICard
        title="Completed Orders"
        value={completedOrders}
        description="Orders classified as completed"
        color="bg-green-500"
        isLoading={isLoading}
      />

      <KPICard
        title="Cancelled Orders"
        value={cancelledOrders}
        description="Orders classified as cancelled"
        color="bg-red-500"
        isLoading={isLoading}
      />
    </section>
  );
}
