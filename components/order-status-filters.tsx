import { FiltersType, OrderStatusFiltersProps } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Accordion } from "./ui/accordion";
import FilterOption from "./filter-option";
import { DEV_ORDER_STATUS_API, MONTH, ORDER_STATUS, WEEK } from "@/constants";
import { useState, useEffect } from "react";
import axios from "axios";

// Helper function to build query string
const buildQuery = (
  month: string[],
  week: string[],
  order_status: string[],
): string => {
  const params = new URLSearchParams();

  month.forEach((m) => params.append("month", m));
  week.forEach((w) => params.append("week", w.toString()));
  order_status.forEach((os) => params.append("order_status", os));
  return params.toString();
};

const OrderStatusFilters: React.FC<OrderStatusFiltersProps> = ({
  setOrderStatusData,
}: OrderStatusFiltersProps) => {
  const [filters, setFilters] = useState<FiltersType>({
    month: [],
    week: [],
    order_status: [],
  });

  // Fetch data based on current filters
  const fetchFilteredData = async () => {
    try {
      const query = buildQuery(
        filters.month,
        filters.week,
        filters.order_status,
      );
      const response = await axios.get(`${DEV_ORDER_STATUS_API}?${query}`);
      setOrderStatusData(response.data);
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  };

  // Fetch data initially and whenever filters change
  useEffect(() => {
    fetchFilteredData();
  });

  const handleClearFilters = () => {
    setFilters({ month: [], week: [], order_status: [] });
  };

  return (
    <section className="pb-2 md:pb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-8 w-64 sm:mr-8 2xl:mr-10">
          <DropdownMenuLabel className="flex items-center justify-between">
            Data Filters
            <Button variant="link" className="p-0" onClick={handleClearFilters}>
              Clear
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="mx-0.5 bg-border" />
          <Accordion type="single" className="w-full" defaultValue="Month">
            <FilterOption
              title="Month"
              options={MONTH}
              filters={filters}
              setFilters={setFilters}
            />
            <FilterOption
              title="Week"
              options={WEEK}
              filters={filters}
              setFilters={setFilters}
            />
            <FilterOption
              title="Order Status"
              options={ORDER_STATUS}
              filters={filters}
              setFilters={setFilters}
            />
          </Accordion>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
  );
};

export default OrderStatusFilters;
