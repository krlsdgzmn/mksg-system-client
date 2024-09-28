import CreateUserButton from "@/components/auth/create-user-button";
import UserManagementTable from "@/components/auth/user-management-table";
import Container from "@/components/container";
import PageHeader from "@/components/page-header";
import ShieldAlert from "@/components/shield-alert";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function UserManagementPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/sign-in");

  if (user && user.user_metadata.role === "User") {
    return (
      <ShieldAlert
        header="Please contact your admin."
        subheader="The page you're trying to access requires authorization."
      />
    );
  }

  return (
    <Container>
      <PageHeader
        header="User Management"
        subheader="Administer and Control User Roles and Permissions"
        button={<CreateUserButton />}
      />

      <UserManagementTable />
    </Container>
  );
}
