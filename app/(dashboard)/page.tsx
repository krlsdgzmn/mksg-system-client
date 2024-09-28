import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function OrderPredictionPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  return (
    <Container>
      <PageHeader
        header="Order Forecasting Dashboard"
        subheader="Forecasts for Order Management and Fulfillment"
      />
    </Container>
  );
}
