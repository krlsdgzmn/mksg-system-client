import { ShieldAlertIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Container from "./container";
import PageHeader from "./page-header";
import { Button } from "./ui/button";

type ShieldAlertProps = {
  header: string;
  subheader: string;
};

export default function ShieldAlert({ header, subheader }: ShieldAlertProps) {
  const router = useRouter();

  return (
    <Container className="relative flex min-h-[85vh] items-center justify-center">
      <main className="flex max-w-[350px] flex-col">
        <div className="flex items-center gap-2 text-red-500">
          <ShieldAlertIcon size={32} />
          <h1 className="text-sm font-bold">Shield Alert</h1>
        </div>
        <PageHeader header={header} subheader={subheader} className="py-4" />
        <Button
          onClick={() => router.push("/")}
          className="flex items-center gap-2"
          size="sm"
        >
          Go Back
        </Button>
      </main>
    </Container>
  );
}
