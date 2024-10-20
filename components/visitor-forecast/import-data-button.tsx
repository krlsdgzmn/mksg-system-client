"use client";

import { useGetVisitorActual } from "@/hooks/use-visitor-actual";
import { DownloadCloud, FileUp } from "lucide-react";
import { Button } from "../ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";
import ImportDataForm from "./import-data-form";

export default function ImportDataButton() {
  const { data } = useGetVisitorActual();

  const requiredDate = data ? new Date(data.date) : null;
  if (requiredDate) {
    requiredDate.setDate(requiredDate.getDate() + 1);
  }

  const formattedDate = requiredDate
    ? `${requiredDate.getFullYear()}-${String(requiredDate.getMonth() + 1).padStart(2, "0")}-${String(requiredDate.getDate()).padStart(2, "0")}`
    : "N/A";

  const formattedDownloadDate = requiredDate
    ? `${requiredDate.getFullYear()}${String(requiredDate.getMonth() + 1).padStart(2, "0")}${String(requiredDate.getDate()).padStart(2, "0")}`
    : "N/A";

  // Get today's date in the same format
  const today = new Date();
  const formattedToday = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}`;

  // Check if the download should be disabled
  const isDisabled = formattedDownloadDate === formattedToday;

  const downloadUrl = `https://seller.shopee.ph/api/mydata/traffic/dashboard/export/?period=day&dt=${formattedDownloadDate}`;

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileUp size={14} /> Import Data
        </Button>
      </DrawerTrigger>

      <DrawerContent className="mx-auto rounded-lg px-6 pb-6">
        <div className="mx-auto w-full md:max-w-lg">
          <h1 className="font-semibold">Download the Required Data</h1>

          <p className="pb-2 text-sm text-muted-foreground">
            {isDisabled ? (
              "Data for today is not yet available for download. Please try again tomorrow."
            ) : (
              <>
                Sign in to your{" "}
                <a
                  href="https://seller.shopee.ph/"
                  className="text-blue-500 underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Shopee Seller Account
                </a>{" "}
                first before downloading.
              </>
            )}
          </p>

          {isDisabled ? (
            <Button className="flex w-full items-center gap-2" disabled>
              <DownloadCloud size={14} /> Download Unavailable
            </Button>
          ) : (
            <a href={downloadUrl}>
              <Button className="flex w-full items-center gap-2">
                <DownloadCloud size={14} /> Download {formattedDate}
              </Button>
            </a>
          )}

          <h1 className="pt-8 font-semibold">Import the Downloaded Data</h1>

          <p className="pb-2 text-sm text-muted-foreground">
            Ensure the downloaded file is for{" "}
            <span className="font-medium">{formattedDate}</span>, then upload
            below.
          </p>
        </div>

        <ImportDataForm isDisabled={isDisabled} />
      </DrawerContent>
    </Drawer>
  );
}
