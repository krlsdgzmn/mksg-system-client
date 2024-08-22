"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import { useGetOrderForecast } from "../hooks";

const ORDER_FORECAST_API = process.env.NEXT_PUBLIC_ORDER_FORECAST_API as string;

export default function DeleteForecast({ id }: { id: number }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useGetOrderForecast();
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    setIsLoading(true);

    try {
      await axios.delete(`${ORDER_FORECAST_API}${id}`);
      refetch();
      toast({
        title: "Success",
        description: "You have successfully deleted a record.",
      });
    } catch (_) {
      toast({
        title: "Failed to delete",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="outline" className="rounded-full">
          <Trash size={15} className="text-red-500" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-[50px] rounded-full backdrop-blur supports-[backdrop-filter]:bg-background/50">
        <Button
          onClick={async () => await handleDelete(id)}
          variant="ghost"
          className="w-full rounded-full px-0 text-xs hover:text-red-500"
          size="sm"
        >
          {isLoading ? "Deleting..." : "Delete"}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
