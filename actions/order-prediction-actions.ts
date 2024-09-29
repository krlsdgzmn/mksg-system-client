"use server";

import {
  FilterCategories,
  OrderPrediction,
  OrderPredictors,
} from "@/types/order-prediction-response";

const ORDER_PREDICTION_URL = process.env
  .NEXT_PUBLIC_ORDER_PREDICTION_URL as string;

const buildQuery = (filters: FilterCategories) => {
  const params = new URLSearchParams();

  filters.month.forEach((value) => params.append("month", value));
  filters.week.forEach((value) => params.append("week", value));
  filters.order_status.forEach((value) => params.append("order_status", value));

  return params.toString();
};

export const getOrderPredictions = async (): Promise<OrderPrediction[]> => {
  const response = await fetch(ORDER_PREDICTION_URL, { method: "GET" });
  return await response.json();
};

export const getFilteredOrderPredictions = async (
  filters: FilterCategories,
): Promise<OrderPrediction[]> => {
  const query = buildQuery(filters);
  const response = await fetch(`${ORDER_PREDICTION_URL}?${query}`, {
    method: "GET",
  });
  return await response.json();
};

export const deleteOrderPrediction = async (id: number) => {
  await fetch(`${ORDER_PREDICTION_URL}/${id}`, { method: "DELETE" });
};

export const createOrderPrediction = async (formData: OrderPredictors) => {
  await fetch(ORDER_PREDICTION_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
};
