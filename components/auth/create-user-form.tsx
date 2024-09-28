import { createUserAction } from "@/actions/auth-actions";
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
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const CreateUserFormSchema = z
  .object({
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
    password: z
      .string({ message: "Please enter the password." })
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
    confirm_password: z
      .string({ message: "Please enter the password confirmation." })
      .trim(),
    role: z.string({ message: "Please select a user role." }).trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
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
  {
    id: "password",
    name: "Password",
    type: "password",
  },
  {
    id: "confirm_password",
    name: "Confirm password",
    type: "password",
  },
];

type CreateUserFormProps = {
  setIsOpen: (isOpen: boolean) => void;
};

export default function CreateUserForm({ setIsOpen }: CreateUserFormProps) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<z.infer<typeof CreateUserFormSchema>>({
    resolver: zodResolver(CreateUserFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateUserFormSchema>) => {
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("role", values.role);

    try {
      const { error } = await createUserAction(formData);

      if (error) {
        toast({
          title: `${error}`,
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
            name={item.id as keyof z.infer<typeof CreateUserFormSchema>}
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
          {isSubmitting ? "Creating user..." : <>Create user</>}
        </Button>
      </form>
    </Form>
  );
}
