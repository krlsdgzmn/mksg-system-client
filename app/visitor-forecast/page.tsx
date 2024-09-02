"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import VisitorsChart from "./_components/visitors-chart";
import KPISection from "../order-forecast/_components/kpi-section";

export default function VisitorForecastPage() {
  const { data: user, isLoading } = useAuth();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setCheckedAuth(true);
    }
  }, [isLoading]);

  if (isLoading || !checkedAuth) return <Loader />;

  if (!user) {
    return (
      <ShieldAlert
        header="Please sign in to continue."
        subheader="The page you're trying to access requires authentication."
      />
    );
  }

  return (
    <Container className="flex min-h-[85vh] flex-col items-center overflow-auto">
      <main className="w-full">
        <PageHeader
          header="Visitor Forecasting Dashboard"
          subheader="Hourly Visitor Traffic Predictions"
          className="pb-2 xl:pb-4"
        />

        <KPISection totalOrders={10} completedOrders={5} cancelledOrders={5} />

        <VisitorsChart />
      </main>
    </Container>
  );
}
