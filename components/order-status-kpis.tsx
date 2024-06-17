import { OrderStatusKPIsProps } from "@/types";
import KPICard from "./kpi-card";

export default function OrderStatusKPIs({
  totalOrders,
  completedOrders,
  cancelledOrders,
}: OrderStatusKPIsProps) {
  return (
    <section className="grid grid-cols-2 gap-2.5 md:grid-cols-3">
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
