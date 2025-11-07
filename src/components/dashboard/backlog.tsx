'use client';

import { useState, Fragment } from 'react';
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
import BacklogChart from './backlog-chart';

type Status = {
  order: number;
  item: number;
  avg: number;
};

type DataType = {
  name: string;
  statuses: {
    paymentAccepted: Status;
    inProgress: Status;
    picked: Status;
    packed: Status;
  };
};

type HourlyData = {
  hour: string;
  value: number;
}[];

type BacklogProps = {
  data: {
    types: DataType[];
  };
  hourlyData: HourlyData;
};

export default function Backlog({ data, hourlyData }: BacklogProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>BACKLOG</CardTitle>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <div className="overflow-x-auto pt-4">
            <Table className="min-w-full border">
              <TableHeader>
                <TableRow>
                  <TableHead rowSpan={2} className="border-r">#</TableHead>
                  <TableHead rowSpan={2} className="border-r">Type</TableHead>
                  <TableHead colSpan={2} className="text-center border-r">Payment accepted</TableHead>
                  <TableHead colSpan={2} className="text-center border-r">In Progress</TableHead>
                  <TableHead colSpan={2} className="text-center border-r">Picked</TableHead>
                  <TableHead colSpan={2} className="text-center">Packed</TableHead>
                </TableRow>
                <TableRow>
                  {Array(4).fill(0).map((_, i) => (
                    <Fragment key={i}>
                      <TableHead className="border-r">Order</TableHead>
                      <TableHead className={i === 3 ? "" : "border-r"}>Item</TableHead>
                    </Fragment>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.types.map((type, index) => (
                  <TableRow key={type.name}>
                    <TableCell className="border-r">{index + 1}</TableCell>
                    <TableCell className="font-medium border-r">{type.name}</TableCell>
                    
                    <TableCell className="text-right border-r">{type.statuses.paymentAccepted.order.toLocaleString()}</TableCell>
                    <TableCell className="text-right border-r">{type.statuses.paymentAccepted.item.toLocaleString()}</TableCell>

                    <TableCell className="text-right border-r">{type.statuses.inProgress.order.toLocaleString()}</TableCell>
                    <TableCell className="text-right border-r">{type.statuses.inProgress.item.toLocaleString()}</TableCell>

                    <TableCell className="text-right border-r">{type.statuses.picked.order.toLocaleString()}</TableCell>
                    <TableCell className="text-right border-r">{type.statuses.picked.item.toLocaleString()}</TableCell>

                    <TableCell className="text-right border-r">{type.statuses.packed.order.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{type.statuses.packed.item.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <BacklogChart data={hourlyData} />
        </CardContent>
      )}
    </Card>
  );
}
