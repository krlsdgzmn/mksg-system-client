import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ForecastsPatternDashboard from "@/components/visitor-forecast/forecasts-pattern-dashboard";
import ImportDataButton from "@/components/visitor-forecast/import-data-button";
import PromotionalTrendsDashboard from "@/components/visitor-forecast/promotional-trends-dashboard";
import VisitorForecastDashboard from "@/components/visitor-forecast/visitor-forecast-dashboard";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function VisitorForecastPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <Container>
      <PageHeader
        header="Visitor Forecasting Dashboard"
        subheader="Hourly Visitor Traffic Predictions"
        button={user.user_metadata.role !== "User" && <ImportDataButton />}
      />

      <VisitorForecastDashboard />
      <PromotionalTrendsDashboard />
      <ForecastsPatternDashboard />
    </Container>
  );
}
