"use client";

import { signInAction } from "@/actions/auth-actions";
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
import { Loader2, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const SignInFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
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
});

const inputs = [
  {
    name: "Email",
    type: "email",
  },
  {
    name: "Password",
    type: "password",
  },
];

export default function SignInForm() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<z.infer<typeof SignInFormSchema>>({
    resolver: zodResolver(SignInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignInFormSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);

    try {
      const result = await signInAction(formData);

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
        description: "You are signed in to MKSG Clothing system",
      });
    } finally {
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
              item.name.toLowerCase() as keyof z.infer<typeof SignInFormSchema>
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
          className="flex w-full items-center gap-1 text-sm"
          variant="outline"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? (
            "Signing in..."
          ) : (
            <>
              Sign in <LogIn size={14} />
            </>
          )}
        </Button>

        <Link href="/forgot-password">
          <Button
            className="mt-3 flex w-full items-center text-sm text-muted-foreground"
            variant="link"
            type="button"
          >
            Forgot password?
          </Button>
        </Link>
      </form>
    </Form>
  );
}
