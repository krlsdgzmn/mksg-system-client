export type PromotionalTrends = {
  "End-Month": Record<number, number>;
  "Mid-Month": Record<number, number>;
  "Monthly Promo": Record<number, number>;
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
