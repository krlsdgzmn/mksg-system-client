import { Loader2 } from "lucide-react";
import Container from "./container";

export default function Loader() {
  return (
    <Container className="relative flex min-h-[85vh] items-center justify-center">
      <Loader2 size={32} className="animate-spin" />
    </Container>
  );
}
