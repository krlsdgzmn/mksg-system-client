"use client";

import { useGetVisitorActual } from "@/hooks/use-visitor-actual";
import { DownloadCloud, FileUp } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

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

  const downloadUrl = `https://seller.shopee.ph/api/mydata/traffic/dashboard/export/?period=day&dt=${formattedDownloadDate}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <FileUp size={14} /> Import Data
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <h1 className="font-semibold">Download the Required Data</h1>

          <p className="pb-2 text-sm text-muted-foreground">
            Sign in to your Shopee seller account first before downloading.
          </p>

          <a href={downloadUrl}>
            <Button className="flex w-full items-center gap-2">
              <DownloadCloud size={14} />
              Download {formattedDate}
            </Button>
          </a>

          <h1 className="pt-2 font-semibold">Import the Downloaded Data</h1>

          <p className="pb-2 text-sm text-muted-foreground">
            Ensure the downloaded file is for{" "}
            <span className="font-medium">{formattedDate}</span>, then upload
            below.
          </p>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
