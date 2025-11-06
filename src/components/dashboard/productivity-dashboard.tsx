'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type PerformanceData = {
  id: number;
  name: string;
  job: string;
  totalOrder: number;
  totalQty: number;
  targetOrder: number;
  targetQuantity: number;
  status: string;
};

type ProductivityDashboardProps = {
  data: {
    date: string;
    performance: PerformanceData[];
  };
};

export default function ProductivityDashboard({ data }: ProductivityDashboardProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center p-2 bg-destructive text-destructive-foreground">
        MARKETPLACE PERFORMANCE, {data.date}
      </h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full border">
          <TableHeader>
            <TableRow className="bg-cyan-400 hover:bg-cyan-500">
              <TableHead className="border-r text-black">NO</TableHead>
              <TableHead className="border-r text-black">NAME</TableHead>
              <TableHead className="border-r text-black">JOB</TableHead>
              <TableHead className="border-r text-black">TOTAL ORDER</TableHead>
              <TableHead className="border-r text-black">TOTAL QTY</TableHead>
              <TableHead colSpan={2} className="text-center border-r text-black">TARGET</TableHead>
              <TableHead className="text-black">STATUS</TableHead>
            </TableRow>
            <TableRow className="bg-cyan-400 hover:bg-cyan-500">
                <TableHead className="border-r"></TableHead>
                <TableHead className="border-r"></TableHead>
                <TableHead className="border-r"></TableHead>
                <TableHead className="border-r"></TableHead>
                <TableHead className="border-r"></TableHead>
                <TableHead className="text-center border-r bg-red-500 text-white">ORDER</TableHead>
                <TableHead className="text-center border-r bg-red-500 text-white">QUANTITY</TableHead>
                <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.performance.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="border-r">{item.id}</TableCell>
                <TableCell className="border-r">{item.name}</TableCell>
                <TableCell className="border-r">{item.job}</TableCell>
                <TableCell className="border-r text-right">{item.totalOrder}</TableCell>
                <TableCell className="border-r text-right">{item.totalQty}</TableCell>
                <TableCell className="border-r text-right bg-red-500 text-white">{item.targetOrder.toLocaleString()}</TableCell>
                <TableCell className="border-r text-right bg-red-500 text-white">{item.targetQuantity.toLocaleString()}</TableCell>
                <TableCell className={cn("text-center font-bold", item.status === "GAGAL" ? "bg-yellow-400" : "")}>
                    <div className="flex items-center justify-center gap-2">
                        <span>{item.status}</span>
                        {item.status === "GAGAL" && <ThumbsDown className="h-4 w-4" />}
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
