import { updateUserAction } from "@/actions/auth-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const UpdateUserFormSchema = z.object({
  first_name: z
    .string({ message: "Please enter the first name." })
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(100, {
      message: "First name must not exceed 100 characters.",
    })
    .trim()
    .refine((value) => value.length > 0, {
      message: "First name cannot be empty or just spaces.",
    }),
  last_name: z
    .string({ message: "Please enter the last name." })
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(100, {
      message: "Last name must not exceed 100 characters.",
    })
    .trim()
    .refine((value) => value.length > 0, {
      message: "Last name cannot be empty or just spaces.",
    }),
  email: z.string().email({ message: "Please enter a valid email." }).trim(),
  role: z.string({ message: "Please select a user role." }).trim(),
});

const inputs = [
  {
    id: "first_name",
    name: "First name",
    type: "text",
  },
  {
    id: "last_name",
    name: "Last name",
    type: "text",
  },
  {
    id: "email",
    name: "Email",
    type: "email",
  },
];

type UpdateUserFormProps = {
  setIsOpen: (isOpen: boolean) => void;
  user: User;
};

export default function UpdateUserForm({
  setIsOpen,
  user,
}: UpdateUserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof UpdateUserFormSchema>>({
    resolver: zodResolver(UpdateUserFormSchema),
    defaultValues: {
      email: user.email,
      first_name: user.user_metadata.first_name,
      last_name: user.user_metadata.last_name,
      role: user.user_metadata.role,
    },
  });

  const onSubmit = async (values: z.infer<typeof UpdateUserFormSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("role", values.role);

    try {
      const result = await updateUserAction(user.id, formData);

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
        description: "You have successfully created a user.",
      });
    } finally {
      form.reset();
      setIsSubmitting(false);
      setIsOpen(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        {inputs.map((item) => (
          <FormField
            key={item.id}
            control={form.control}
            name={item.id as keyof z.infer<typeof UpdateUserFormSchema>}
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

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500/90" />
            </FormItem>
          )}
        />

        <Button
          className="flex w-full items-center gap-1 text-sm"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {isSubmitting ? "Updating user..." : <>Update user</>}
        </Button>
      </form>
    </Form>
  );
}
