import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ImportDataButton from "@/components/visitor-forecast/import-data-button";
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
        button={<ImportDataButton />}
      />

      <VisitorForecastDashboard />
    </Container>
  );
}
