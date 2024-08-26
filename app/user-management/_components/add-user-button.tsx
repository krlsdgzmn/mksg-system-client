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
import axios, { AxiosError } from "axios";
import { Loader2, User2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddUserFormSchema = z.object({
  first_name: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(100, {
      message: "First name must not exceed 100 characters.",
    })
    .trim(),
  last_name: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(100, {
      message: "Last name must not exceed 100 characters.",
    })
    .trim(),
  username: z
    .string()
    .min(5, {
      message: "Username must be at least 5 characters.",
    })
    .max(32, {
      message: "Username must not exceed 32 characters.",
    })
    .trim(),
  password: z
    .string()
    .min(8, {
      message: "Password must be at least 8 characters.",
    })
    .max(32, {
      message: "Password must not exceed 32 characters.",
    })
    .trim(),
  role: z.string().trim(),
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
  },
  {
    id: "password",
    name: "Password",
    type: "password",
  },
];

export default function AddUserButton({ refetch }: { refetch: () => void }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof AddUserFormSchema>>({
    resolver: zodResolver(AddUserFormSchema),
  });

  const onSubmit = async (values: z.infer<typeof AddUserFormSchema>) => {
    setIsLoading(true);

    try {
      const formData = {
        username: values.username,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        role: values.role,
      };

      await axios.post(
        `${process.env.NEXT_PUBLIC_AUTH_API}register/`,
        formData,
      );

      refetch();

      toast({
        title: "Success",
        description: "You have successfully added a user.",
      });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Check if the error is due to the user already existing
        if (
          error.response.status === 400 &&
          error.response.data.detail === "User already exists."
        ) {
          toast({
            title: "Failed",
            description:
              "User already exists. Please try a different username.",
            variant: "destructive",
          });
        } else {
          // Handle other types of errors
          toast({
            title: "Failed",
            description: `Please try again. ${error.response.data.detail}`,
            variant: "destructive",
          });
        }
      } else {
        // Handle non-Axios errors
        toast({
          title: "Failed",
          description: "An unexpected error occurred. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
      form.reset({
        first_name: undefined,
        last_name: undefined,
        username: undefined,
        password: undefined,
        role: undefined,
      });
      setOpen(false);
    }
  };

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="mt-2 flex items-center gap-2"
          variant="outline"
          size="sm"
        >
          <User2 size={14} />
          Add User
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-lg sm:max-w-[450px]">
        <DialogHeader className="pt-4 text-left">
          <DialogTitle className="flex items-end gap-2 leading-4">
            <User2 size={18} />
            Add User
          </DialogTitle>
          <DialogDescription>
            Fill out the form below to add a user
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
                        <Input type={item.type} {...field} />
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
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            </section>
            <DialogFooter>
              <Button
                type="submit"
                className="mt-6 align-middle"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Adding..." : "Add User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
