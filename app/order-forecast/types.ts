export type OrderForecast = {
  id: number;
  price_bin: string;
  discount_bin: string;
  month: string;
  week: number;
  distance_bin: string;
  cancel_rate: number;
  order_status: string;
};

export type FilterCategories = {
  month: string[];
  week: string[];
  order_status: string[];
};
