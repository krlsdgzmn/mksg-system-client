export const MONTH = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const WEEK = ["1", "2", "3", "4"];

export const ORDER_STATUS = ["Completed", "Cancelled"];

export const PRICE_BIN = [
  "0-499",
  "500-999",
  "1000-1499",
  "1500-1999",
  ">2000",
];

export const DISCOUNT_BIN = ["0-24", "25-49", "50-74", "75-99", ">100"];

export const DISTANCE_BIN = [
  "0-199",
  "200-399",
  "400-599",
  "600-799",
  "800-999",
  ">1000",
];

export const ORDER_FORECAST_FILTERS_INIT = {
  month: [],
  week: [],
  order_status: [],
};

export const ORDER_FORECAST_API = process.env
  .NEXT_PUBLIC_ORDER_FORECAST_API as string;
