import Footer from "@/components/footer";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "MKSG Clothing System",
  description:
    "A system to forecast the order status and project the number of visitors hourly for MKSG Clothing's Shopee Store.",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="remove-scrollbar flex min-h-screen flex-col items-center justify-between font-sans antialiased">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
