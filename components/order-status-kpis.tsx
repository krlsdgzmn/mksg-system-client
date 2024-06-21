import { OrderStatusKPIsProps } from "@/types";
import KPICard from "./kpi-card";

export default function OrderStatusKPIs({
  orderStatusData,
}: OrderStatusKPIsProps) {
  const totalOrders: number = orderStatusData.length;
  const completedOrders: number = orderStatusData.filter(
    (order) => order.order_status === "Completed",
  ).length;

  const cancelledOrders: number = orderStatusData.filter(
    (order) => order.order_status === "Cancelled",
  ).length;

  return (
    <section className="grid grid-cols-2 gap-2.5 pb-4 sm:grid-cols-3 md:gap-4">
      <KPICard
        title="Total Orders"
        value={totalOrders}
        description="Total orders placed"
        span="col-span-2"
        color="bg-foreground"
      />

      <KPICard
        title="Completed Orders"
        value={completedOrders}
        description="Orders classified as completed"
        color="bg-green-500"
      />

      <KPICard
        title="Cancelled Orders"
        value={cancelledOrders}
        description="Orders classified as cancelled"
        color="bg-red-500"
      />
    </section>
  );
}
