"use client";

import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import {
  MONTH,
  ORDER_FORECAST_FILTERS_INIT,
  ORDER_STATUS,
  WEEK,
} from "../constants";
import { useFilteredOrderForecast } from "../hooks";
import { FilterCategories } from "../types";
import FilterCategory from "./filter-category";

const filterCategories = [
  { title: "Month", category: MONTH },
  { title: "Week", category: WEEK },
  { title: "Order Status", category: ORDER_STATUS },
];

export default function DataFilters() {
  const [filters, setFilters] = useState<FilterCategories>(
    ORDER_FORECAST_FILTERS_INIT,
  );

  const { mutateAsync } = useFilteredOrderForecast();

  // Handle filter changes
  const handleFiltersChange = async (
    newFilters: FilterCategories,
  ): Promise<void> => {
    setFilters(newFilters);
    await mutateAsync(newFilters);
  };

  // Clear filters
  const handleClearFilters = async (): Promise<void> => {
    setFilters(ORDER_FORECAST_FILTERS_INIT);
    await mutateAsync(ORDER_FORECAST_FILTERS_INIT);
  };

  return (
    <div className="pt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="sm" variant="outline">
            Filters
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="ml-8 w-64" align="end">
          <DropdownMenuLabel className="flex items-center justify-between py-0">
            <span>Filters</span>

            <Button variant="link" className="p-0" onClick={handleClearFilters}>
              Clear
            </Button>
          </DropdownMenuLabel>

          <DropdownMenuSeparator className="mx-0.5 bg-border" />

          <Accordion type="single" className="w-full" defaultValue="Month">
            {filterCategories.map((item) => (
              <FilterCategory
                key={item.title}
                title={item.title}
                category={item.category}
                filters={filters}
                setFilters={handleFiltersChange}
              />
            ))}
          </Accordion>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
