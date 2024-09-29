"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Glasses } from "lucide-react";
import { useState } from "react";
import OrderPredictionForm from "./order-prediction-form";

export default function OrderPredictButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2" variant="outline">
          <Glasses size={14} />
          Predict Record
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

        <OrderPredictionForm isOpen={isOpen} setIsOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  );
}
