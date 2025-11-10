'use client';

import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from '../ui/scroll-area';

const metricsSchema = z.object({
  forecast: z.coerce.number().min(0),
});

type MetricsFormValues = z.infer<typeof metricsSchema>;

const hourlyBacklogSchema = z.object({
  hourlyData: z.array(z.object({
    hour: z.string(),
    value: z.coerce.number().min(0),
  })),
});

type HourlyBacklogFormValues = z.infer<typeof hourlyBacklogSchema>;

type AdminFormProps = {
  onMetricsSubmit: (data: MetricsFormValues) => void;
  onHourlyBacklogSubmit: (data: HourlyBacklogFormValues) => void;
  hourlyData: { hour: string; value: number }[];
  metrics: { forecast: number };
};

const MetricsForm = ({ onMetricsSubmit, metrics }: { onMetricsSubmit: (data: MetricsFormValues) => void; metrics: { forecast: number } }) => {
  const form = useForm<MetricsFormValues>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      forecast: metrics.forecast || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onMetricsSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="forecast"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Forecast</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Metrics</Button>
      </form>
    </Form>
  );
};

const HourlyBacklogForm = ({ onHourlyBacklogSubmit, hourlyData }: { onHourlyBacklogSubmit: (data: HourlyBacklogFormValues) => void, hourlyData: { hour: string; value: number }[] }) => {
  const form = useForm<HourlyBacklogFormValues>({
    resolver: zodResolver(hourlyBacklogSchema),
    defaultValues: {
      hourlyData: hourlyData || [],
    },
  });

  const { fields } = useFieldArray({
    control: form.control,
    name: 'hourlyData',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onHourlyBacklogSubmit)} className="space-y-4 pt-4">
        <ScrollArea className="h-72 w-full">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 pr-4">
            {fields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`hourlyData.${index}.value`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{`Hour ${hourlyData[index].hour}`}</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
          </div>
        </ScrollArea>
        <Button type="submit">Update Hourly Backlog</Button>
      </form>
    </Form>
  );
};

export default function AdminForm({ onMetricsSubmit, onHourlyBacklogSubmit, hourlyData, metrics }: AdminFormProps) {
  return (
    <Tabs defaultValue="metrics" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="hourly">Hourly Backlog</TabsTrigger>
      </TabsList>
      <TabsContent value="metrics">
        <MetricsForm onMetricsSubmit={onMetricsSubmit} metrics={metrics} />
      </TabsContent>
      <TabsContent value="hourly">
        <HourlyBacklogForm onHourlyBacklogSubmit={onHourlyBacklogSubmit} hourlyData={hourlyData} />
      </TabsContent>
    </Tabs>
  );
}
