"use client";

import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import { useAuth } from "../hooks";

export default function VisitorForecast() {
  const { data } = useAuth();

  if (data)
    return (
      <Container className="flex min-h-[86vh] flex-col items-center overflow-auto">
        <main className="w-full">
          <PageHeader
            header="Visitor Forecasting Dashboard"
            subheader="Hourly Visitor Traffic Predictions"
          />
        </main>
      </Container>
    );
}
