import OrderStatusKPIs from "@/components/order-status-kpis";
import PageHeader from "@/components/page-header";
import { DEV_ORDER_STATUS_API } from "@/constants";
import { OrderStatusType } from "@/types";
import axios, { AxiosResponse } from "axios";

const getData = async (): Promise<OrderStatusType[]> => {
  try {
    const response: AxiosResponse<OrderStatusType[]> =
      await axios.get(DEV_ORDER_STATUS_API);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  }
};

export default async function OrderStatusPage() {
  const data: OrderStatusType[] = await getData();
  const totalOrders: number = data.length;
  const completedOrders: number = data.filter(
    (order) => order.order_status === "Completed",
  ).length;
  const cancelledOrders: number = data.filter(
    (order) => order.order_status === "Cancelled",
  ).length;

  return (
    <main className="container min-h-screen w-full">
      <PageHeader
        title="Order Status"
        description="Dashboard page for order status prediction"
      />

      <OrderStatusKPIs
        totalOrders={totalOrders}
        completedOrders={completedOrders}
        cancelledOrders={cancelledOrders}
      />
    </main>
  );
}
