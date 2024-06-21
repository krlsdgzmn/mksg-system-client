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
import { MONTH, ORDER_STATUS, WEEK } from "@/constants";
import { useState, useEffect } from "react";
import { fetchFilteredOrderStatus } from "@/lib/services/order-status-service";

const OrderStatusFilters: React.FC<OrderStatusFiltersProps> = ({
  setOrderStatusData,
}: OrderStatusFiltersProps) => {
  const [filters, setFilters] = useState<FiltersType>({
    month: [],
    week: [],
    order_status: [],
  });

  // Fetch data initially and whenever filters change
  useEffect(() => {
    fetchFilteredOrderStatus(filters, setOrderStatusData);
  }, [filters, setOrderStatusData]);

  const handleClearFilters = () => {
    setFilters({ month: [], week: [], order_status: [] });
  };

  return (
    <section className="pb-2 md:pb-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">Filters</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="ml-8 w-64" align="end">
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
