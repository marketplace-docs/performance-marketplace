'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';

type HourlyStatus = {
    hour: string;
    paymentAccepted: number;
    wavetaskAssign: number;
    wavetaskProgress: number;
    picked: number;
    packed: number;
    shipped: number;
};

type HourlyOrderStatusProps = {
  data: HourlyStatus[];
};

const formatNumber = (num: number) => num.toLocaleString();

export default function HourlyOrderStatus({ data }: HourlyOrderStatusProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!data) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>Hourly Order Status</CardTitle>
        <Button variant="outline" size="icon">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="mt-4 border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Hours</TableHead>
                  <TableHead>Payment Accepted</TableHead>
                  <TableHead>Wavetask Assign</TableHead>
                  <TableHead>Wavetask Progress</TableHead>
                  <TableHead>Picked</TableHead>
                  <TableHead>Packed</TableHead>
                  <TableHead>Shipped</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((item) => (
                  <TableRow key={item.hour}>
                    <TableCell>{item.hour}</TableCell>
                    <TableCell>{formatNumber(item.paymentAccepted)}</TableCell>
                    <TableCell>{formatNumber(item.wavetaskAssign)}</TableCell>
                    <TableCell>{formatNumber(item.wavetaskProgress)}</TableCell>
                    <TableCell>{formatNumber(item.picked)}</TableCell>
                    <TableCell>{formatNumber(item.packed)}</TableCell>
                    <TableCell>{formatNumber(item.shipped)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
