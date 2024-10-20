import { VisitorForecast } from "@/types/visitor-forecast-response";

const VISITOR_FORECAST_URL = process.env
  .NEXT_PUBLIC_VISITOR_FORECAST_URL as string;

export const getVisitorForecasts = async (): Promise<VisitorForecast[]> => {
  try {
    const response = await fetch(VISITOR_FORECAST_URL, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
