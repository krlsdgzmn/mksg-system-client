"use client";

import { useImportAndRetrainData } from "@/hooks/use-import-and-retrain-data";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUp } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";
import { DrawerClose } from "../ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const ImportDataFormSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files.length === 1, "You must upload exactly one file.")
    .refine(
      (files) =>
        files[0]?.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Only .xlsx extension files are accepted.",
    ),
});

type ImportDataFormValues = z.infer<typeof ImportDataFormSchema>;

type ImportDataFormProps = {
  isDisabled: boolean;
};

export default function ImportDataForm({ isDisabled }: ImportDataFormProps) {
  const form = useForm<ImportDataFormValues>({
    resolver: zodResolver(ImportDataFormSchema),
  });

  const { mutate, isPending } = useImportAndRetrainData();

  const onSubmit = async (data: ImportDataFormValues) => {
    try {
      const file = data.file[0];
      mutate({ file });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form
        className="mx-auto w-full md:max-w-lg"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="file"
          control={form.control}
          render={(_) => (
            <FormItem>
              <FormControl>
                <Input
                  {...form.register("file")}
                  type="file"
                  accept=".xlsx"
                  disabled={isDisabled}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500/90">
                {form.formState.errors.file?.message}
              </FormMessage>
            </FormItem>
          )}
        />

        {isDisabled && (
          <p className="pt-4 text-sm text-red-600">
            You cannot upload data for today because it is not yet available.
          </p>
        )}

        <Button
          type="submit"
          className="mb-2 mt-4 flex w-full items-center gap-2"
          disabled={isDisabled || isPending}
        >
          <FileUp size={14} />
          {isPending ? "Uploading..." : "Upload New Data"}
        </Button>

        <DrawerClose className="w-full">
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
        </DrawerClose>
      </form>
    </Form>
  );
}
