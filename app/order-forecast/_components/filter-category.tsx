import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { FilterCategories } from "../types";

type FilterCategoryProps = {
  title: string;
  filters: FilterCategories;
  category: string[];
  setFilters: (newFilters: FilterCategories) => Promise<void>;
};

export default function FilterCategory({
  title,
  category,
  filters,
  setFilters,
}: FilterCategoryProps) {
  // Update filters based on the selected category
  const updateFilters = (
    newFilters: FilterCategories,
    option: string,
    isChecked: boolean,
    key: keyof FilterCategories,
  ) => {
    newFilters[key] = isChecked
      ? [...newFilters[key], option]
      : newFilters[key].filter((prevOption) => prevOption !== option);
  };

  const handleOnCheckedChange = async (
    option: string,
    isChecked: boolean,
  ): Promise<void> => {
    const newFilters = { ...filters };

    switch (title) {
      case "Month":
        updateFilters(newFilters, option, isChecked, "month");
        break;
      case "Week":
        updateFilters(newFilters, option, isChecked, "week");
        break;
      case "Order Status":
        updateFilters(newFilters, option, isChecked, "order_status");
        break;
    }

    await setFilters(newFilters);
  };

  return (
    <AccordionItem
      value={title}
      className={title === "Order Status" ? "border-none" : ""}
    >
      <AccordionTrigger className="mx-2 py-2 text-sm hover:no-underline">
        {title}
      </AccordionTrigger>

      <AccordionContent className="mx-2 grid grid-cols-2 gap-y-2">
        {category.map((option) => (
          <div className="flex items-center gap-1.5" key={option}>
            <Checkbox
              id={option}
              checked={
                (title === "Month" && filters.month.includes(option)) ||
                (title === "Week" && filters.week.includes(option)) ||
                (title === "Order Status" &&
                  filters.order_status.includes(option))
              }
              onCheckedChange={(isChecked: boolean) =>
                handleOnCheckedChange(option, isChecked)
              }
            />
            <label
              htmlFor={option}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {option}
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
