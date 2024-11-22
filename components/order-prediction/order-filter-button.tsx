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
import {
  MONTH,
  ORDER_PREDICTION_FILTERS_INIT,
  ORDER_STATUS,
  WEEK,
} from "@/constants/order-prediction";
import { useGetFilteredOrderPredictions } from "@/hooks/use-order-predictions";
import { useToast } from "@/hooks/use-toast";
import { FilterCategories } from "@/types/order-prediction-response";
import { SlidersHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import FilterCategory from "./filter-category";

const filterCategories = [
  { title: "Month", category: MONTH },
  { title: "Week", category: WEEK },
  { title: "Order Status", category: ORDER_STATUS },
];

export default function DataFilters() {
  const { mutate, isError } = useGetFilteredOrderPredictions();
  const { toast } = useToast();
  const [filters, setFilters] = useState<FilterCategories>(
    ORDER_PREDICTION_FILTERS_INIT,
  );

  // Handle filter changes
  const handleFiltersChange = (newFilters: FilterCategories): void => {
    setFilters(newFilters);
    mutate(newFilters);
  };

  // Clear filters
  const handleClearFilters = (): void => {
    setFilters(ORDER_PREDICTION_FILTERS_INIT);
    mutate(ORDER_PREDICTION_FILTERS_INIT);
  };

  useEffect(() => {
    if (isError) {
      toast({
        title: "Failed to filter data",
        description: "Please reload the page",
        variant: "destructive",
      });
    }
  }, [isError, toast]);

  return (
    <div className="pt-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            <SlidersHorizontal size={14} /> Filters
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="ml-8 w-64 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-background/90"
          align="end"
        >
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
                handleFiltersChange={handleFiltersChange}
              />
            ))}
          </Accordion>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
