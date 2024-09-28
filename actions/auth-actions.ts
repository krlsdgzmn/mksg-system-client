"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInAction(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/", "layout");
  redirect("/");
}

export async function createUserAction(formData: FormData) {
  const supabase = createClient();

  const { error } = await supabase.auth.admin.createUser({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    user_metadata: {
      email: formData.get("email") as string,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      role: formData.get("role") as string,
    },
    email_confirm: true,
  });

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/user-management", "layout");
  redirect("/user-management");
}

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  return redirect("/sign-in");
}

export async function sendResetPasswordAction(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string,
    { redirectTo: "/reset-password" },
  );

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function resetPasswordAction(formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.updateUser({
    password: formData.get("password") as string,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function getAuthUsersAction() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return { error: error.message };
  }

  return data.users;
}

export async function deleteUserAction(id: string) {
  const supabase = createClient();
  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/user-management", "layout");
  redirect("/user-management");
}

export async function updateUserAction(id: string, formData: FormData) {
  const supabase = createClient();
  const { error } = await supabase.auth.admin.updateUserById(id, {
    email: formData.get("email") as string,
    user_metadata: {
      email: formData.get("email") as string,
      first_name: formData.get("first_name") as string,
      last_name: formData.get("last_name") as string,
      role: formData.get("role") as string,
    },
  });

  if (error) {
    return { error: error.message };
  }
  revalidatePath("/user-management", "layout");
  redirect("/user-management");
}
