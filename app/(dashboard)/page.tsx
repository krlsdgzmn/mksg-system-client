import Container from "@/components/container";
import OrderFilterButton from "@/components/order-prediction/order-filter-button";
import OrderPredictionDashboard from "@/components/order-prediction/order-prediction-dashboard";
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
        header="Order Prediction Dashboard"
        subheader="Predictions for Order Management and Fulfillment"
        button={<OrderFilterButton />}
      />

      <OrderPredictionDashboard />
    </Container>
  );
}
