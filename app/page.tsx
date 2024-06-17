export default function OrderStatusPage() {
  return (
    <main className="container min-h-screen w-full">
      {/* title header */}
      <header className="pb-4">
        <h1 className="pt-4 text-lg font-bold md:text-xl">
          Order Status Dashboard
        </h1>

        <p className="text-sm text-foreground/50 md:text-base">
          Dashboard section for order status prediction
        </p>
      </header>

      {/* kpi section */}
      <section className="grid grid-cols-2 gap-2 lg:grid-cols-3"></section>

      {/* visualization section */}
      <section></section>
    </main>
  );
}
