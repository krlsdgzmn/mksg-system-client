export type OrderStatusType = {
  price_bin: string;
  discount_bin: string;
  month: string;
  week: number;
  distance_bin: string;
  cancel_rate: number;
  order_status: string;
};

export type PageHeaderProps = {
  title: string;
  description: string;
};

export type OrderStatusKPIsProps = {
  totalOrders: number;
  completedOrders: number;
  cancelledOrders: number;
};

export type KPICardProps = {
  title: string;
  value: number;
  description: string;
  span?: string;
  color: string;
};
