"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  dailyForecast: z.coerce.number().min(0, "Forecast must be a positive number."),
  oosData: z.coerce.number().min(0, "OOS data must be a positive number."),
  remarks: z.string().optional(),
});

export default function AdminForm() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dailyForecast: 0,
      oosData: 0,
      remarks: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Data Submitted",
      description: "Forecast monitoring data has been successfully updated.",
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forecast Monitoring</CardTitle>
        <CardDescription>
          Input daily forecast, OOS data, and remarks.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="dailyForecast"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Daily Forecast</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 5000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="oosData"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Out of Stock (OOS) Data</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="e.g., 50" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="remarks"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Remarks</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Optional remarks..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Submit Data
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
