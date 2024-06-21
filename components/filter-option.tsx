import { FilterOptionProps } from "@/types";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import { Checkbox } from "./ui/checkbox";

export default function FilterOption({
  title,
  options,
  filters,
  setFilters,
}: FilterOptionProps) {
  const handleOnCheckedChange = (id: string, checked: boolean | string) => {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      if (title === "Month") {
        if (checked) {
          newFilters.month = [...newFilters.month, id];
        } else {
          newFilters.month = newFilters.month.filter((item) => item !== id);
        }
      } else if (title === "Week") {
        if (checked) {
          newFilters.week = [...newFilters.week, id];
        } else {
          newFilters.week = newFilters.week.filter((item) => item !== id);
        }
      } else if (title === "Order Status") {
        if (checked) {
          newFilters.order_status = [...newFilters.order_status, id];
        } else {
          newFilters.order_status = newFilters.order_status.filter(
            (item) => item !== id,
          );
        }
      }

      return newFilters;
    });
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
        {options.map((item) => (
          <div className="flex items-center gap-1.5" key={item}>
            <Checkbox
              id={item}
              checked={
                (title === "Month" && filters.month.includes(item)) ||
                (title === "Week" && filters.week.includes(item)) ||
                (title === "Order Status" &&
                  filters.order_status.includes(item))
              }
              onCheckedChange={(checked) =>
                handleOnCheckedChange(item, checked)
              }
            />
            <label
              htmlFor={item}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item}
            </label>
          </div>
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}
