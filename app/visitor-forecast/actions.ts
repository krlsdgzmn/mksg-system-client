import { VisitorForecasts } from "./type";

const VISITOR_FORECAST_API = process.env
  .NEXT_PUBLIC_VISITOR_FORECAST_API as string;

export const getVisitorForecast = async (): Promise<VisitorForecasts[]> => {
  const response = await fetch(VISITOR_FORECAST_API);
  return await response.json();
};
