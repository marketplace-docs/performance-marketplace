'use client';

import { useRef, useState } from 'react';
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
import { ChevronUp, ChevronDown, Upload, Download } from 'lucide-react';
import { useAdmin } from '@/hooks/use-admin';

type Status = {
  order: number;
  item: number;
  avg: number;
  hPlus1: number;
  hPlus2: number;
  hPlus3: number;
};

type OrderStatusData = {
  types: {
    name: string;
    statuses: {
      paymentAccepted: Status;
      inProgress: Status;
      picked: Status;
      packed: Status;
      shipped: Status;
    };
  }[];
};

type RecapOrderStatusProps = {
  data: OrderStatusData;
};

const formatNumber = (num: number | undefined | null) => {
    if (num === null || num === undefined) {
        return '0';
    }
    if (Number.isInteger(num)) {
        return num.toLocaleString();
    }
    const fixedNum = num.toFixed(2);
    if (fixedNum.endsWith('.00')) {
        return parseInt(fixedNum).toLocaleString();
    }
    return parseFloat(fixedNum).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const statusLabels: Record<string, string> = {
    paymentAccepted: 'Payment Accepted',
    inProgress: 'In Progress',
    picked: 'Picked',
    packed: 'Packed',
    shipped: 'Shipped',
};

export default function RecapOrderStatus({ data }: RecapOrderStatusProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { handleOrderStatusUpload, handleOrderStatusTemplateExport } = useAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);


  if (!data || !data.types) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between">
        <div>
          <CardTitle>Recap Order Status</CardTitle>
          <div className="flex flex-wrap gap-2 mt-4">
            <Button size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="mr-2" />
              Upload CSV
            </Button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept=".csv"
              onChange={handleOrderStatusUpload}
            />
            <Button size="sm" onClick={handleOrderStatusTemplateExport}>
              <Download className="mr-2" />
              Download Template
            </Button>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="mt-4 border rounded-lg overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Item</TableHead>
                  <TableHead>AVG</TableHead>
                  <TableHead>H+&gt;1</TableHead>
                  <TableHead>H+&gt;2</TableHead>
                  <TableHead>H+&gt;3</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.types.map((type, typeIndex) => (
                  Object.entries(type.statuses).map(([statusKey, statusValue], statusIndex) => (
                    <TableRow key={`${type.name}-${statusKey}`}>
                      {statusIndex === 0 && (
                        <TableCell rowSpan={Object.keys(type.statuses).length} className="font-bold align-top">
                          {type.name}
                        </TableCell>
                      )}
                      <TableCell>{statusLabels[statusKey] || statusKey}</TableCell>
                      <TableCell>{formatNumber(statusValue.order)}</TableCell>
                      <TableCell>{formatNumber(statusValue.item)}</TableCell>
                      <TableCell>{formatNumber(statusValue.avg)}</TableCell>
                      <TableCell>{formatNumber(statusValue.hPlus1)}</TableCell>
                      <TableCell>{formatNumber(statusValue.hPlus2)}</TableCell>
                      <TableCell>{formatNumber(statusValue.hPlus3)}</TableCell>
                    </TableRow>
                  ))
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
