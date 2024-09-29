import { createOrderPrediction } from "@/actions/order-prediction-actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DISCOUNT_BIN,
  DISTANCE_BIN,
  MONTH,
  PRICE_BIN,
  WEEK,
} from "@/constants/order-prediction";
import { useGetOrderPredictions } from "@/hooks/use-order-predictions";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../ui/button";

const inputs = [
  {
    id: "price_bin",
    name: "Price",
    placeholder: "Select Price",
    constant: PRICE_BIN,
    unit: "₱",
    isPrefix: true,
  },
  {
    id: "discount_bin",
    name: "Discount",
    placeholder: "Select Discount",
    constant: DISCOUNT_BIN,
    unit: "₱",
    isPrefix: true,
  },
  {
    id: "month",
    name: "Month",
    placeholder: "Select Month",
    constant: MONTH,
    unit: "",
    isPrefix: true,
  },
  {
    id: "week",
    name: "Week",
    placeholder: "Select Week",
    constant: WEEK,
    unit: "Week ",
    isPrefix: true,
  },
  {
    id: "distance_bin",
    name: "Distance",
    placeholder: "Select Distance",
    constant: DISTANCE_BIN,
    unit: "km",
    isPrefix: false,
  },
];

const PredictorsSchema = z.object({
  price_bin: z.string().trim(),
  discount_bin: z.string().trim(),
  month: z.string().trim(),
  week: z.string().trim(),
  distance_bin: z.string().trim(),
});

type OrderPredictionFormProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export default function OrderPredictionForm({
  isOpen,
  setIsOpen,
}: OrderPredictionFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { refetch } = useGetOrderPredictions();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof PredictorsSchema>>({
    resolver: zodResolver(PredictorsSchema),
  });

  const onSubmit = async (values: z.infer<typeof PredictorsSchema>) => {
    setIsLoading(true);

    try {
      const formData = {
        price_bin: values.price_bin,
        discount_bin: values.discount_bin,
        month: values.month,
        week: Number(values.week),
        distance_bin: values.distance_bin,
      };

      await createOrderPrediction(formData);
      refetch();
      toast({
        title: "Success",
        description: "You have successfully predicted a record",
      });
    } catch (error) {
      toast({
        title: `${error}`,
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      form.reset();
      setIsLoading(false);
      setIsOpen(false);
    }
  };

  // Reset the form when the dialog is closed
  useEffect(() => {
    if (!isOpen) {
      form.reset();
    }
  }, [isOpen, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <section className="space-y-3">
          {inputs.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name={item.id as keyof z.infer<typeof PredictorsSchema>}
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="col-span-3">
                        <SelectValue
                          placeholder={item.placeholder}
                          id={item.id}
                        />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      {item.constant.map((constant) => (
                        <SelectItem key={constant} value={constant}>
                          {item.isPrefix
                            ? `${item.unit}${constant}`
                            : `${constant} ${item.unit}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-sm text-red-500/90" />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="flex w-full items-center gap-1 text-sm"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Predicting..." : "Predict Record"}
          </Button>
        </section>
      </form>
    </Form>
  );
}
