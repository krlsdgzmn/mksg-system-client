import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import Container from "@/components/container";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ForgotPasswordPage() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (session) redirect("/");

  return (
    <Container className="relative flex min-h-[85vh] items-center justify-center">
      <div className="flex w-[95%] max-w-[300px] flex-col items-center justify-center gap-3">
        <header className="pb-2 text-center">
          <h1 className="bg-gradient-to-b from-black/60 to-black bg-clip-text text-3xl font-bold text-transparent dark:from-white dark:to-white/50">
            Forgot Password
          </h1>
          <p className="text-base text-muted-foreground">
            Please enter your email below
          </p>
        </header>

        <ForgotPasswordForm />
      </div>
    </Container>
  );
}
