import { FileUp } from "lucide-react";
import { Button } from "../ui/button";

export default function ImportDataButton() {
  return (
    <Button variant="outline" className="flex items-center gap-2">
      <FileUp size={14} /> Import Data
    </Button>
  );
}
