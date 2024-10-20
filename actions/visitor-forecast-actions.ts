import { VisitorForecast } from "@/types/visitor-forecast-response";

const ORDER_PREDICTION_URL = process.env
  .NEXT_PUBLIC_VISITOR_FORECAST_URL as string;

export const getVisitorForecasts = async (): Promise<VisitorForecast[]> => {
  try {
    const response = await fetch(ORDER_PREDICTION_URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
