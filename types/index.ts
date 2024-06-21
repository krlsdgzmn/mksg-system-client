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

export type OrderStatusDashboardProps = {
  data: OrderStatusType[];
};

export type OrderStatusFiltersProps = {
  setOrderStatusData: (orderStatusData: OrderStatusType[]) => void;
};

export type FiltersType = {
  month: string[];
  week: string[];
  order_status: string[];
};

export type FilterOptionProps = {
  title: string;
  filters: FiltersType;
  options: string[];
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
};

export type OrderStatusKPIsProps = {
  orderStatusData: OrderStatusType[];
};

export type KPICardProps = {
  title: string;
  value: number;
  description: string;
  span?: string;
  color: string;
};
