import DeleteButton from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

export default function ActionButton({
  id,
  refetch,
}: {
  id: number;
  refetch: () => void;
}) {
  return (
    <div className="flex w-fit overflow-hidden rounded-md border">
      <Button
        variant="outline"
        className="rounded-none border-none text-blue-500 hover:text-blue-500/90"
      >
        <Pencil size={14} />
      </Button>

      <div className="w-full border-r" />

      <DeleteButton
        id={id}
        url={process.env.NEXT_PUBLIC_USER_API as string}
        refetch={refetch}
        button={
          <Button
            variant="outline"
            className="rounded-none border-none text-red-500 hover:text-red-500/90"
          >
            <Trash2 size={14} />
          </Button>
        }
      />
    </div>
  );
}
