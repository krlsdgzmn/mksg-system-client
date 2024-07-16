import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import KPISection from "./_components/kpi-section";
import DataFilters from "./_components/data-filters";

export default function OrderForecastingDashboardPage() {
  return (
    <Container>
      <PageHeader
        header="Order Forecasting Dashboard"
        subheader="Forecasts for Order Management and Fulfillment"
        filters={<DataFilters />}
      />

      <KPISection />
    </Container>
  );
}
