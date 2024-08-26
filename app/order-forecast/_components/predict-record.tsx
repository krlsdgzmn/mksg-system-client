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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Glasses, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  DISCOUNT_BIN,
  DISTANCE_BIN,
  MONTH,
  ORDER_FORECAST_API,
  PRICE_BIN,
  WEEK,
} from "../constants";
import { useGetOrderForecast } from "../hooks";
import { OrderForecast } from "../types";

const initialFormData = {
  price_bin: "",
  discount_bin: "",
  month: "",
  week: "",
  distance_bin: "",
};

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

export default function PredictRecord() {
  const [formData, setFormData] = useState(initialFormData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { refetch } = useGetOrderForecast();
  const { toast } = useToast();

  const handleSelectChange = (value: string, name: keyof OrderForecast) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (
      !formData.distance_bin ||
      !formData.week ||
      !formData.month ||
      !formData.price_bin ||
      !formData.discount_bin
    ) {
      toast({
        title: "Incomplete fields",
        description: "Please fill all the required fields",
        variant: "destructive",
      });

      return;
    }

    setIsLoading(true);

    try {
      await axios.post(ORDER_FORECAST_API, formData);
      refetch();
      toast({
        title: "Success",
        description: "You have successfully predicted a record",
      });
    } catch (_) {
      toast({
        title: "Failed to predict",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
      setFormData(initialFormData);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline" size="sm">
          <Glasses size={14} />
          Predict
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="py-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <Glasses size={18} />
            Predict Record
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to predict a record
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3">
          {inputs.map((item) => (
            <div key={item.id} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price_bin">{item.name}</Label>
              <Select
                onValueChange={(value) =>
                  handleSelectChange(value, item.id as keyof OrderForecast)
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={item.placeholder} id={item.id} />
                </SelectTrigger>
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
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            className="align-middle font-medium dark:text-black"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Predicting..." : "Predict Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
