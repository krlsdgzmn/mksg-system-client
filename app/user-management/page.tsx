"use client";

import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ActionButton from "./_components/action-button";
import AddUserButton from "./_components/add-user-button";
import { useGetUsers } from "./hooks";

export default function RolesPage() {
  const { data, refetch, isLoading } = useGetUsers();

  return (
    <Container className="flex min-h-[86vh] flex-col items-center overflow-auto">
      <main className="w-full overflow-hidden">
        <PageHeader
          header="User Management"
          subheader="Administer and Control User Roles and Permissions"
          button={<AddUserButton refetch={refetch} />}
        />

        <section className="remove-scrollbar my-2 max-h-[610px] overflow-auto rounded-lg border bg-card shadow dark:bg-muted-foreground/10 md:my-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>

            {data !== undefined && (
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-semibold text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.last_name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>
                      <span
                        className={`${item.role === "Admin" ? "bg-blue-400" : "bg-gray-400"} rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-white`}
                      >
                        {item.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <ActionButton id={item.id} refetch={refetch} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {isLoading &&
            Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="mx-auto mt-2 h-[73px] w-[98%] animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30"
              />
            ))}

          {!data && !isLoading && (
            <p className="flex h-[400px] items-center justify-center text-sm font-medium text-muted-foreground">
              No data found
            </p>
          )}
        </section>
      </main>
    </Container>
  );
}
