import DeleteButton from "@/components/delete-button";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useGetUserById } from "../hooks";
import EditButton from "./edit-button";

export default function ActionButton({
  id,
  refetch,
}: {
  id: number;
  refetch: () => void;
}) {
  const { data } = useGetUserById(id);

  if (data)
    return (
      <div className="flex w-fit overflow-hidden rounded-md border">
        <EditButton user={data} refetch={refetch} />
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
