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
  actual: z.coerce.number().min(0),
  oos: z.coerce.number().min(0),
  actualOOS: z.coerce.number().min(0),
});

type MetricsFormValues = z.infer<typeof metricsSchema>;

const statusSchema = z.object({
  order: z.coerce.number().min(0),
  item: z.coerce.number().min(0),
});

const backlogSchema = z.object({
  paymentAccepted: statusSchema,
  inProgress: statusSchema,
  picked: statusSchema,
  packed: statusSchema,
});

type BacklogFormValues = z.infer<typeof backlogSchema>;

const hourlyBacklogSchema = z.object({
  hourlyData: z.array(z.object({
    hour: z.string(),
    value: z.coerce.number().min(0),
  })),
});

type HourlyBacklogFormValues = z.infer<typeof hourlyBacklogSchema>;

const performanceSchema = z.object({
  picker: z.coerce.number().min(0),
  packer: z.coerce.number().min(0),
});

type PerformanceFormValues = z.infer<typeof performanceSchema>;

type AdminFormProps = {
  onMetricsSubmit: (data: MetricsFormValues) => void;
  onBacklogSubmit: (data: BacklogFormValues) => void;
  onHourlyBacklogSubmit: (data: HourlyBacklogFormValues) => void;
  onPerformanceSubmit: (data: PerformanceFormValues) => void;
  backlogData: { types: { statuses: any }[] };
  hourlyData: { hour: string; value: number }[];
  performanceData: { picker: number; packer: number; };
};

const MetricsForm = ({ onMetricsSubmit }: { onMetricsSubmit: (data: MetricsFormValues) => void }) => {
  const form = useForm<MetricsFormValues>({
    resolver: zodResolver(metricsSchema),
    defaultValues: {
      forecast: 0,
      actual: 0,
      oos: 0,
      actualOOS: 0,
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
        <FormField
          control={form.control}
          name="actual"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actual</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="oos"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OOS</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="actualOOS"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Actual OOS</FormLabel>
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

const BacklogForm = ({ onBacklogSubmit, backlogData }: { onBacklogSubmit: (data: BacklogFormValues) => void, backlogData: { types: { statuses: any }[] } }) => {
  const defaultValues = backlogData?.types?.[0]?.statuses || {};
  const form = useForm<BacklogFormValues>({
    resolver: zodResolver(backlogSchema),
    defaultValues: {
      paymentAccepted: { order: defaultValues.paymentAccepted?.order || 0, item: defaultValues.paymentAccepted?.item || 0 },
      inProgress: { order: defaultValues.inProgress?.order || 0, item: defaultValues.inProgress?.item || 0 },
      picked: { order: defaultValues.picked?.order || 0, item: defaultValues.picked?.item || 0 },
      packed: { order: defaultValues.packed?.order || 0, item: defaultValues.packed?.item || 0 },
    },
  });

  const statuses = [
    { name: 'paymentAccepted', label: 'Payment Accepted' },
    { name: 'inProgress', label: 'In Progress' },
    { name: 'picked', label: 'Picked' },
    { name: 'packed', label: 'Packed' },
  ] as const;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onBacklogSubmit)} className="space-y-6 pt-4">
        {statuses.map(status => (
          <div key={status.name} className="space-y-2 p-3 border rounded-md">
            <h3 className="font-medium">{status.label}</h3>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name={`${status.name}.order`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Order</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${status.name}.item`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}
        <Button type="submit">Update Backlog</Button>
      </form>
    </Form>
  );
}

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

const PerformanceForm = ({ onPerformanceSubmit, performanceData }: { onPerformanceSubmit: (data: PerformanceFormValues) => void, performanceData: PerformanceFormValues }) => {
  const form = useForm<PerformanceFormValues>({
    resolver: zodResolver(performanceSchema),
    defaultValues: {
      picker: performanceData?.picker || 0,
      packer: performanceData?.packer || 0,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onPerformanceSubmit)} className="space-y-4 pt-4">
        <FormField
          control={form.control}
          name="picker"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Picker</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="packer"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Packer</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Update Performance</Button>
      </form>
    </Form>
  );
};


export default function AdminForm({ onMetricsSubmit, onBacklogSubmit, onHourlyBacklogSubmit, onPerformanceSubmit, backlogData, hourlyData, performanceData }: AdminFormProps) {
  return (
    <Tabs defaultValue="metrics" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="metrics">Metrics</TabsTrigger>
        <TabsTrigger value="backlog">Backlog</TabsTrigger>
        <TabsTrigger value="hourly">Hourly Backlog</TabsTrigger>
        <TabsTrigger value="performance">Kinerja</TabsTrigger>
      </TabsList>
      <TabsContent value="metrics">
        <MetricsForm onMetricsSubmit={onMetricsSubmit} />
      </TabsContent>
      <TabsContent value="backlog">
        <BacklogForm onBacklogSubmit={onBacklogSubmit} backlogData={backlogData} />
      </TabsContent>
      <TabsContent value="hourly">
        <HourlyBacklogForm onHourlyBacklogSubmit={onHourlyBacklogSubmit} hourlyData={hourlyData} />
      </TabsContent>
      <TabsContent value="performance">
        <PerformanceForm onPerformanceSubmit={onPerformanceSubmit} performanceData={performanceData} />
      </TabsContent>
    </Tabs>
  );
}
