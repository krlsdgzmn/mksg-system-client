import { DEV_ORDER_STATUS_API } from "@/constants";
import { OrderStatusType } from "@/types";
import axios, { AxiosResponse } from "axios";

// Helper function to fetch the order status data
export const fetchOrderStatus = async (): Promise<OrderStatusType[]> => {
  try {
    const response: AxiosResponse<OrderStatusType[]> =
      await axios.get(DEV_ORDER_STATUS_API);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  }
};

// Helper function to build query string
export const buildOrderStatusQuery = (
  month: string[],
  week: string[],
  order_status: string[],
): string => {
  const params = new URLSearchParams();

  month.forEach((m) => params.append("month", m));
  week.forEach((w) => params.append("week", w.toString()));
  order_status.forEach((os) => params.append("order_status", os));
  return params.toString();
};
