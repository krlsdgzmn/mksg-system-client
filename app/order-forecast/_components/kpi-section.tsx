import KPICard from "@/components/kpi-card";

export default function KPISection({
  totalOrders,
  completedOrders,
  cancelledOrders,
}: {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
}) {
  return (
    <section className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:gap-4">
      <KPICard
        title="Total Orders"
        value={totalOrders}
        description="Total number of orders"
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
