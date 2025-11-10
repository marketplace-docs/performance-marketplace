'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAdmin } from '@/hooks/use-admin';

type HourlyStatus = {
  hour: string;
  paymentAccepted: number;
  wavetaskAssign: number;
  wavetaskProgress: number;
  picked: number;
  packed: number;
  shipped: number;
};

type HourlyStatusRecapProps = {
  data: HourlyStatus[];
};

type TransformedData = {
  [key: string]: {
    hour: string;
    value: number;
  }[];
};

const formatNumber = (num: number) => (num || 0).toLocaleString();

const statusDisplayMapping: { key: keyof Omit<HourlyStatus, 'hour'>; label: string }[] = [
    { key: 'paymentAccepted', label: 'Payment Accepted' },
    { key: 'wavetaskAssign', label: 'Wavetask Assign' },
    { key: 'wavetaskProgress', label: 'Wavetask Progress' },
    { key: 'picked', label: 'Picked' },
    { key: 'packed', label: 'Packed' },
    { key: 'shipped', label: 'Shipped' },
];

export default function HourlyStatusRecap({ data }: HourlyStatusRecapProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { handleHourlyStatusReset } = useAdmin();

    if (!data || data.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Hourly Update Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>No data available to display.</p>
                </CardContent>
            </Card>
        );
    }
  
    const transformedData: TransformedData = {};
    statusDisplayMapping.forEach(({ key, label }) => {
        transformedData[label] = data.map(hourlyItem => ({
            hour: hourlyItem.hour,
            value: hourlyItem[key]
        }));
    });

  return (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Hourly Update Status</CardTitle>
            <div className="flex items-center gap-2">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <RefreshCcw className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will reset all hourly status data to zero.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleHourlyStatusReset}>Reset</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
                <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
            </div>
        </CardHeader>
        {isOpen && (
            <CardContent className="space-y-8">
                {Object.entries(transformedData).map(([status, hourlyData]) => {
                    const grandTotal = hourlyData.reduce((sum, item) => sum + (item.value || 0), 0);

                    return (
                        <div key={status}>
                            <h3 className="text-lg font-semibold mb-4">{status}</h3>
                            <div className="flex items-center gap-4">
                                <div className="grid grid-cols-12 gap-2 text-center flex-grow">
                                    {hourlyData.map((item) => (
                                        <div key={item.hour} className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col items-center justify-center">
                                            <div className="text-xs text-muted-foreground">{item.hour}</div>
                                            <div className="font-bold text-destructive">{formatNumber(item.value)}</div>
                                        </div>
                                    ))}
                                </div>
                                <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-2 flex flex-col items-center justify-center min-w-[100px]">
                                    <div className="text-sm font-bold">Grand Total</div>
                                    <div className="text-xl font-bold text-destructive">{formatNumber(grandTotal)}</div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </CardContent>
        )}
    </Card>
  );
}
