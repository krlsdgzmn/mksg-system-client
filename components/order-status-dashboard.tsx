"use client";

import OrderStatusFilters from "./order-status-filters";
import OrderStatusKPIs from "./order-status-kpis";
import { OrderStatusDashboardProps, OrderStatusType } from "@/types";
import { useState } from "react";
import PageHeader from "./page-header";

export default function OrderStatusDashboard({
  data,
}: OrderStatusDashboardProps) {
  const [orderStatusData, setOrderStatusData] =
    useState<OrderStatusType[]>(data);

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
        <PageHeader
          title="Order Status"
          description="Dashboard page for order status prediction"
        />
        <OrderStatusFilters setOrderStatusData={setOrderStatusData} />
      </div>

      <OrderStatusKPIs orderStatusData={orderStatusData} />
    </>
  );
}
