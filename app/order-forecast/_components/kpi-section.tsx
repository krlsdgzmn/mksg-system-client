"use client";

import KPICard from "@/components/kpi-card";
import { useGetOrderForecast } from "../hooks";

export default function KPISection() {
  const { data } = useGetOrderForecast();

  const totalOrders = data ? data.length : 0;
  const completedOrders = data
    ? data.filter((item) => item.order_status === "Completed").length
    : 0;
  const cancelledOrders = data
    ? data.filter((item) => item.order_status === "Cancelled").length
    : 0;

  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:gap-4">
      <KPICard
        title="Total Orders"
        value={totalOrders}
        description="Total number of classified orders"
        icon="/total.svg"
      />

      <KPICard
        title="Completed Orders"
        value={completedOrders}
        description="Orders classified as completed"
        icon="/completed.svg"
      />

      <KPICard
        title="Cancelled Orders"
        value={cancelledOrders}
        description="Orders classified as cancelled"
        icon="/cancelled.svg"
      />
    </section>
  );
}
