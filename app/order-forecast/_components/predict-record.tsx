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
        <Button variant="outline" size="sm">
          Predict Record
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="py-4 text-left">
          <DialogTitle>Predict Record</DialogTitle>
          <DialogDescription>
            Fill out the form below to predict a record
          </DialogDescription>
        </DialogHeader>

        <DialogDescription className="space-y-3">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="price_bin">Price</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "price_bin")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Price" id="price_bin" />
              </SelectTrigger>
              <SelectContent>
                {PRICE_BIN.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discount_bin">Discount</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange(value, "discount_bin")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Discount" id="discount_bin" />
              </SelectTrigger>
              <SelectContent>
                {DISCOUNT_BIN.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="month">Month</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "month")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Month" id="month" />
              </SelectTrigger>
              <SelectContent>
                {MONTH.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="week">Week</Label>
            <Select
              onValueChange={(value) => handleSelectChange(value, "week")}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Week" id="week" />
              </SelectTrigger>
              <SelectContent>
                {WEEK.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="distance_bin">Distance</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange(value, "distance_bin")
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select Distance" id="distance_bin" />
              </SelectTrigger>
              <SelectContent>
                {DISTANCE_BIN.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </DialogDescription>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            type="submit"
            className="font-medium dark:text-black"
          >
            {isLoading ? "Predicting..." : "Predict Record"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
