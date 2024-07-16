import { FilterCategories, OrderForecast } from "./types";

// Base URL of Order Forecast API
const ORDER_FORECAST_API = process.env.NEXT_PUBLIC_ORDER_FORECAST_API as string;

// Helper function to build query filters
const buildQuery = (filters: FilterCategories) => {
  const params = new URLSearchParams();

  filters.month.forEach((value) => params.append("month", value));
  filters.week.forEach((value) => params.append("week", value));
  filters.order_status.forEach((value) => params.append("order_status", value));

  return params.toString();
};

// Function to get order forecasts
export const getOrderForecast = async (): Promise<OrderForecast[]> => {
  const response = await fetch(ORDER_FORECAST_API);
  const data = await response.json();
  return data;
};

// Function to get filtered order forecasts
export const getFilteredOrderForecast = async (
  filters: FilterCategories,
): Promise<OrderForecast[]> => {
  const query = buildQuery(filters);
  const response = await fetch(`${ORDER_FORECAST_API}/?${query}`);
  const data = await response.json();
  return data;
};
