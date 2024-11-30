export type PromotionalTrends = {
  "End-Month": Record<number, number>;
  "Mid-Month": Record<number, number>;
  "Monthly Promo": Record<number, number>;
};

export type PromotionalMetrics = {
  non_promo: number;
  events_promo: number;
  percentage: number;
  highest_event: string;
  intepretation: string;
};

const PROMOTIONAL_TRENDS_URL = process.env
  .NEXT_PUBLIC_PROMOTIONAL_TRENDS_URL as string;

export const getPromotionalTrends = async (
  month: string,
): Promise<PromotionalTrends> => {
  const response = await fetch(`${PROMOTIONAL_TRENDS_URL}?month=${month}`, {
    method: "GET",
  });
  return await response.json();
};

export const getPromotionalMetrics = async (
  month: string,
): Promise<PromotionalMetrics> => {
  const response = await fetch(
    `${PROMOTIONAL_TRENDS_URL}/metrics?month=${month}`,
    {
      method: "GET",
    },
  );
  return await response.json();
};
