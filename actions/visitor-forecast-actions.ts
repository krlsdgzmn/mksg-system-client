import { VisitorForecast } from "@/types/visitor-forecast-response";

const ORDER_PREDICTION_URL = process.env
  .NEXT_PUBLIC_VISITOR_FORECAST_URL as string;

export const getVisitorForecasts = async (): Promise<VisitorForecast[]> => {
  const response = await fetch(ORDER_PREDICTION_URL, { method: "GET" });
  return await response.json();
};
