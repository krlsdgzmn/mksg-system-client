import OrderStatusDashboard from "@/components/order-status-dashboard";
import { DEV_ORDER_STATUS_API } from "@/constants";
import { OrderStatusType } from "@/types";
import axios, { AxiosResponse } from "axios";

const getOrderStatus = async (): Promise<OrderStatusType[]> => {
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
  const data: OrderStatusType[] = await getOrderStatus();

  return (
    <main className="container min-h-screen w-full max-w-screen-2xl">
      <OrderStatusDashboard data={data} />
    </main>
  );
}
