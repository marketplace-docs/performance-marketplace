'use client';

import { useForm } from 'react-hook-form';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const formSchema = z.object({
  forecast: z.coerce.number().min(0),
  actual: z.coerce.number().min(0),
  oos: z.coerce.number().min(0),
  actualOOS: z.coerce.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

type AdminFormProps = {
  onDataSubmit: (data: FormValues) => void;
};

export default function AdminForm({ onDataSubmit }: AdminFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      forecast: 0,
      actual: 0,
      oos: 0,
      actualOOS: 0,
    },
  });

  function onSubmit(values: FormValues) {
    onDataSubmit(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Controls</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            <Button type="submit">Update Data</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
