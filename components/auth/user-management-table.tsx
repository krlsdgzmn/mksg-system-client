"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUsers } from "@/hooks/use-get-users";
import { Loader2 } from "lucide-react";
import DeleteUserButton from "./delete-user-button";
import UpdateUserButton from "./update-user-button";

export default function UserManagementTable() {
  const { data, isLoading } = useGetUsers();

  return (
    <section className="remove-scrollbar my-2 max-h-[610px] overflow-auto rounded-lg border bg-card p-4 pb-0 shadow dark:bg-muted-foreground/10 xl:my-4">
      <Table className="text-xs sm:text-sm">
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[100px]">First name</TableHead>
            <TableHead className="min-w-[100px]">Last name</TableHead>
            <TableHead className="min-w-[100px]">Email</TableHead>
            <TableHead className="min-w-[100px]">Last sign in at</TableHead>
            <TableHead className="min-w-[100px]">Role</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>

        {data && (
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id} className="h-[75px]">
                <TableCell>{item.user_metadata.first_name}</TableCell>
                <TableCell>{item.user_metadata.last_name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>
                  {item.last_sign_in_at
                    ? new Date(item.last_sign_in_at).toLocaleString()
                    : "No sign in data available"}
                </TableCell>
                <TableCell>
                  <div
                    className={`${item.user_metadata.role === "Admin" ? "bg-blue-500" : item.user_metadata.role === "Owner" ? "bg-red-500" : "bg-gray-500"} max-w-[55px] rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-white`}
                  >
                    {item.user_metadata.role}
                  </div>
                </TableCell>
                <TableCell>
                  {item.user_metadata.role !== "Owner" && (
                    <div className="flex w-fit overflow-hidden rounded-md border bg-background outline-none">
                      <UpdateUserButton user={item} />
                      <DeleteUserButton id={item.id} />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>

      {isLoading && (
        <p className="flex h-[75px] items-center justify-center text-sm font-medium text-muted-foreground">
          <Loader2 className="animate-spin" />
        </p>
      )}

      {!data && !isLoading && (
        <p className="flex h-[75px] items-center justify-center text-sm font-medium text-muted-foreground">
          No data found
        </p>
      )}
    </section>
  );
}
