import { DEV_ORDER_STATUS_API } from "@/constants";
import { FiltersType, OrderStatusType } from "@/types";
import axios, { AxiosResponse } from "axios";

// Helper function to fetch the order status data
export const fetchOrderStatus = async (
  query?: string,
): Promise<OrderStatusType[]> => {
  try {
    const response: AxiosResponse<OrderStatusType[]> = await axios.get(
      `${DEV_ORDER_STATUS_API}?${query}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
    return [];
  }
};

// Helper function to build query string
const buildOrderStatusQuery = (
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

// Helper function to fetch the filtered order status
export const fetchFilteredOrderStatus = async (
  filters: FiltersType,
  setOrderStatusData: any,
) => {
  try {
    const query = buildOrderStatusQuery(
      filters.month,
      filters.week,
      filters.order_status,
    );
    const data = await fetchOrderStatus(query);
    setOrderStatusData(data);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};
