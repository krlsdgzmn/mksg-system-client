"use client";

import Container from "@/components/container";
import Loader from "@/components/loader";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import ActionButton from "./_components/action-button";
import AddUserButton from "./_components/add-user-button";
import { useGetUsers } from "./hooks";

export default function RolesPage() {
  const [checkedAuth, setCheckedAuth] = useState(false);
  const { data, refetch, isLoading: isLoadingUsers } = useGetUsers();
  const { data: user, isLoading: isLoadingAuth } = useAuth();

  useEffect(() => {
    if (!isLoadingAuth) {
      setCheckedAuth(true);
    }
  }, [isLoadingAuth]);

  if (isLoadingAuth || !checkedAuth) return <Loader />;

  if (!user && !isLoadingAuth) {
    return (
      <ShieldAlert
        header="Please sign in to continue."
        subheader="The page you're trying to access requires authentication."
      />
    );
  }

  if (user && user.role === "User") {
    return (
      <ShieldAlert
        header="Please contact your admin."
        subheader="The page you're trying to access requires authorization."
      />
    );
  }

  return (
    <Container className="flex min-h-[85vh] flex-col items-center overflow-auto">
      <main className="w-full overflow-hidden">
        <PageHeader
          header="User Management"
          subheader="Administer and Control User Roles and Permissions"
          button={<AddUserButton refetch={refetch} />}
        />

        <section className="remove-scrollbar my-2 max-h-[610px] overflow-auto rounded-lg border bg-card shadow dark:bg-muted-foreground/10 xl:my-4">
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

            {data && (
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.id} className="h-[75px]">
                    <TableCell className="font-semibold text-muted-foreground">
                      {item.id}
                    </TableCell>
                    <TableCell>{item.first_name}</TableCell>
                    <TableCell>{item.last_name}</TableCell>
                    <TableCell>{item.username}</TableCell>
                    <TableCell>
                      <span
                        className={`${item.role === "Admin" ? "bg-blue-400" : item.role === "Owner" ? "bg-red-500" : "bg-gray-400"} rounded-2xl px-1.5 py-0.5 text-center text-xs font-semibold text-white`}
                      >
                        {item.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      {item.role !== "Owner" && (
                        <ActionButton id={item.id} refetch={refetch} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
          </Table>

          {isLoadingUsers &&
            Array.from({ length: 7 }).map((_, index) => (
              <div
                key={index}
                className="mx-auto mt-2 h-[73px] w-[98%] animate-pulse rounded-md bg-gradient-to-br from-white/30 to-muted-foreground/30"
              />
            ))}

          {!data && !isLoadingUsers && (
            <p className="flex h-[400px] items-center justify-center text-sm font-medium text-muted-foreground">
              No data found
            </p>
          )}
        </section>
      </main>
    </Container>
  );
}
