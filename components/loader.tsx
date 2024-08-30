import { Loader2 } from "lucide-react";
import Container from "./container";

export default function Loader() {
  return (
    <Container className="relative flex min-h-[86vh] items-center justify-center border">
      <Loader2 size={32} className="animate-spin" />
    </Container>
  );
}
