"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Glasses, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  DISCOUNT_BIN,
  DISTANCE_BIN,
  MONTH,
  ORDER_FORECAST_API,
  PRICE_BIN,
  WEEK,
} from "../constants";
import { useGetOrderForecast } from "../hooks";

const inputs = [
  {
    id: "price_bin",
    name: "Price",
    placeholder: "Select Price",
    constant: PRICE_BIN,
    unit: "₱",
    isPrefix: true,
  },
  {
    id: "discount_bin",
    name: "Discount",
    placeholder: "Select Discount",
    constant: DISCOUNT_BIN,
    unit: "₱",
    isPrefix: true,
  },
  {
    id: "month",
    name: "Month",
    placeholder: "Select Month",
    constant: MONTH,
    unit: "",
    isPrefix: true,
  },
  {
    id: "week",
    name: "Week",
    placeholder: "Select Week",
    constant: WEEK,
    unit: "Week ",
    isPrefix: true,
  },
  {
    id: "distance_bin",
    name: "Distance",
    placeholder: "Select Distance",
    constant: DISTANCE_BIN,
    unit: "km",
    isPrefix: false,
  },
];

const PredictorsSchema = z.object({
  price_bin: z.string().trim(),
  discount_bin: z.string().trim(),
  month: z.string().trim(),
  week: z.string().trim(),
  distance_bin: z.string().trim(),
});

export default function PredictRecord() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { refetch } = useGetOrderForecast();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PredictorsSchema>>({
    resolver: zodResolver(PredictorsSchema),
  });

  const onSubmit = async (values: z.infer<typeof PredictorsSchema>) => {
    setIsLoading(true);

    try {
      const formData = {
        price_bin: values.price_bin,
        discount_bin: values.discount_bin,
        month: values.month,
        week: values.week,
        distance_bin: values.distance_bin,
      };

      await axios.post(ORDER_FORECAST_API, formData);
      await refetch();
      toast({
        title: "Success",
        description: "You have successfully predicted a record",
      });
    } catch (error) {
      console.error("Prediction Error:", error);
      toast({
        title: "Failed to predict",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setOpen(false);
      form.reset();
    }
  };

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline" size="sm">
          <Glasses size={14} />
          Predict
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <Glasses size={18} />
            Predict Record
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to predict a record
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="space-y-3">
              {inputs.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.id as keyof z.infer<typeof PredictorsSchema>}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.name}</FormLabel>

                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="col-span-3">
                            <SelectValue
                              placeholder={item.placeholder}
                              id={item.id}
                            />
                          </SelectTrigger>
                        </FormControl>

                        <SelectContent>
                          {item.constant.map((constant) => (
                            <SelectItem key={constant} value={constant}>
                              {item.isPrefix
                                ? `${item.unit}${constant}`
                                : `${constant} ${item.unit}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage className="text-sm text-red-500/90" />
                    </FormItem>
                  )}
                />
              ))}
            </section>

            <DialogFooter>
              <Button
                type="submit"
                className="mt-6 align-middle font-medium dark:text-black"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Predicting..." : "Predict Record"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
