import { User } from "@/app/providers";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Loader2, Pencil, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddUserFormSchema = z
  .object({
    first_name: z
      .string()
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
      .string()
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
    username: z
      .string()
      .min(5, {
        message: "Username must be at least 5 characters.",
      })
      .max(32, {
        message: "Username must not exceed 32 characters.",
      })
      .trim()
      .regex(/^\S*$/, {
        message: "Username cannot contain spaces.",
      }),
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
    role: z.string().trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords do not match.",
  });

const inputs = [
  {
    id: "first_name",
    name: "First Name",
    type: "text",
  },
  {
    id: "last_name",
    name: "Last Name",
    type: "text",
  },
  {
    id: "username",
    name: "Username",
    type: "text",
    isDisabled: true,
  },
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

export default function EditButton({
  user,
  refetch,
}: {
  user: User;
  refetch: () => void;
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof AddUserFormSchema>>({
    resolver: zodResolver(AddUserFormSchema),
    defaultValues: {
      ...user,
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof AddUserFormSchema>) => {
    setIsLoading(true);

    try {
      const formData = {
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        role: values.role,
      };

      if (user)
        await axios.put(
          `${process.env.NEXT_PUBLIC_AUTH_API}user/${user.id}/`,
          formData,
        );

      refetch();

      toast({
        title: "Success",
        description: "You have successfully updated the user.",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (
          error.response.status === 400 &&
          error.response.data.detail.includes("sqlite3.IntegrityError")
        ) {
          toast({
            title: "Failed",
            description:
              "Username already exists. Please choose a different username.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Failed",
            description: `Please try again. ${error.response.data.detail}`,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      setOpen(false);
      form.reset({
        first_name: "",
        last_name: "",
        username: "",
        password: "",
        confirm_password: "",
        role: "",
      });
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="rounded-none border-none text-blue-500 hover:text-blue-500/90"
        >
          <Pencil size={14} />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <User2 size={18} />
            Edit User
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to edit user details
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <section className="space-y-1">
              {inputs.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name={item.id as keyof z.infer<typeof AddUserFormSchema>}
                  render={({ field }) => (
                    <FormItem key={item.id}>
                      <FormLabel>{item.name}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type={item.type}
                          disabled={item.isDisabled}
                        />
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
                    <FormLabel>Role</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
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
            </section>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-6 align-middle"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
