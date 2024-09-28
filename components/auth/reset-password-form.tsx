"use client";

import { resetPasswordAction } from "@/actions/auth-actions";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ResetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, {
        message: "Password must be at least 8 characters.",
      })
      .max(32, {
        message: "Password must not exceed 32 characters.",
      })
      .trim()
      .regex(/^\S*$/, {
        message: "Password cannot contain spaces.",
      }),
    confirm_password: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const inputs = [
  {
    id: "password",
    name: "Password",
    type: "password",
  },
  {
    id: "confirm_password",
    name: "Confirm Password",
    type: "password",
  },
];
export default function ResetPasswordForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof ResetPasswordSchema>>({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof ResetPasswordSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("password", values.password);

    try {
      const result = await resetPasswordAction(formData);

      if (result !== undefined && result.error) {
        toast({
          title: `${result.error}`,
          description: "Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your password has been successfully changed.",
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
            key={item.id}
            control={form.control}
            name={item.id as keyof z.infer<typeof ResetPasswordSchema>}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input {...field} type={item.type} placeholder={item.name} />
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
          {isSubmitting ? "Submitting..." : <>Confirm reset</>}
        </Button>
      </form>
    </Form>
  );
}
