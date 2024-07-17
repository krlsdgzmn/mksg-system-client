import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import DataFilters from "./_components/data-filters";
import DistributionChart from "./_components/distribution-chart";
import KPISection from "./_components/kpi-section";

export default function OrderForecastingDashboardPage() {
  return (
    <Container>
      <PageHeader
        header="Order Forecasting Dashboard"
        subheader="Forecasts for Order Management and Fulfillment"
        filters={<DataFilters />}
      />

      <main className="grid gap-2 pt-2 xl:grid-cols-8 xl:gap-4 xl:pt-4">
        {/* Left side */}
        <section className="xl:col-span-5">
          <KPISection />
        </section>

        {/* Right side */}
        <section className="xl:col-span-3">
          <DistributionChart />
        </section>
      </main>
    </Container>
  );
}
