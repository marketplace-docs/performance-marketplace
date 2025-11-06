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
import { useAdmin } from '@/hooks/use-admin';
import { useEffect } from 'react';

const formSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  job: z.string().min(1, 'Job is required'),
  totalOrder: z.coerce.number().min(0),
  totalQty: z.coerce.number().min(0),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductivityForm() {
    const { editingPerformance, handleProductivityUpdate, setIsProductivityFormOpen } = useAdmin();

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            id: 0,
            name: '',
            job: '',
            totalOrder: 0,
            totalQty: 0,
        },
    });

    useEffect(() => {
        if (editingPerformance) {
            form.reset(editingPerformance);
        }
    }, [editingPerformance, form]);


    const onSubmit = (data: FormValues) => {
        handleProductivityUpdate(data);
    };

    return (
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="job"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Job</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="totalOrder"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Total Order</FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="totalQty"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Total Qty</FormLabel>
                <FormControl>
                    <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
            <Button type="submit">Update</Button>
        </form>
        </Form>
    );
}
