import OrderStatusDashboard from "@/components/order-status-dashboard";
import { fetchOrderStatus } from "@/lib/services/order-status-service";
import { OrderStatusType } from "@/types";

export default async function OrderStatusPage() {
  const data: OrderStatusType[] = await fetchOrderStatus();

  return (
    <main className="container min-h-screen w-full max-w-screen-2xl">
      <OrderStatusDashboard data={data} />
    </main>
  );
}
