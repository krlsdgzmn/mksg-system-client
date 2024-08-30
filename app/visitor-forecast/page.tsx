"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { useAuth } from "../hooks";

export default function VisitorForecast() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return <Loader />;

  if (!user && !isLoading)
    return (
      <ShieldAlert
        header="Please sign in to continue."
        subheader="The page you're trying to access requires authentication."
      />
    );

  if (user && !isLoading)
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
