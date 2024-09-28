"use client";

import { sendResetPasswordAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link2, Loader2, MoveLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ForgotPasswordFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
});

const inputs = [
  {
    name: "Email",
    type: "email",
  },
];

export default function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ForgotPasswordFormSchema>>({
    resolver: zodResolver(ForgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ForgotPasswordFormSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", values.email);

    try {
      await sendResetPasswordAction(formData);
      toast({
        title: "Success",
        description: "The password reset link has sent to your email.",
      });
    } catch (error) {
      toast({
        title: `${error}`.substring(6),
        description: "Please try again.",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        {inputs.map((item) => (
          <FormField
            key={item.name}
            control={form.control}
            name={
              item.name.toLowerCase() as keyof z.infer<
                typeof ForgotPasswordFormSchema
              >
            }
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input type={item.type} placeholder={item.name} {...field} />
                </FormControl>
                <FormMessage className="text-sm text-red-500/90" />
              </FormItem>
            )}
          />
        ))}

        <Button
          className="flex w-full items-center gap-2 text-sm"
          variant="outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? (
            "Submitting..."
          ) : (
            <>
              Reset password <Link2 size={14} />
            </>
          )}
        </Button>

        <Link href="/sign-in">
          <Button
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-muted-foreground"
            variant="secondary"
            type="button"
          >
            <MoveLeft size={18} /> Go to sign in
          </Button>
        </Link>
      </form>
    </Form>
  );
}
