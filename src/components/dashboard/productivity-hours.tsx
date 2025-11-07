'use client';

import React from 'react';
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
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Progress } from '../ui/progress';

type RoleData = {
  jumlah: number;
  totalOrder: number;
  totalQuantity: number;
  byHours: number;
  targetOrder: number;
  targetQuantity: number;
  status: string;
  progress: number;
};

type ProductivityHoursProps = {
  data: {
    picker: RoleData;
    packer: RoleData;
  };
};

const formatNumber = (num: number) => {
    if (Number.isInteger(num)) {
        return num.toLocaleString();
    }
    const fixedNum = num.toFixed(2);
    // If the number is like 12.00, show 12.
    if (fixedNum.endsWith('.00')) {
        return parseInt(fixedNum).toLocaleString();
    }
    return parseFloat(fixedNum).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}


const ProductivityRow = ({ role, data }: { role: string; data: RoleData }) => (
  <TableRow>
    <TableCell className="font-bold">{role}</TableCell>
    <TableCell>{data.jumlah.toLocaleString()}</TableCell>
    <TableCell>{data.totalOrder.toLocaleString()}</TableCell>
    <TableCell>{data.totalQuantity.toLocaleString()}</TableCell>
    <TableCell>{formatNumber(data.byHours)}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetOrder.toLocaleString()}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetQuantity.toLocaleString()}</TableCell>
    <TableCell>
      <Badge className={cn("text-center font-bold", data.status === "GAGAL" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-green-500 hover:bg-green-600")}>
        <div className="flex items-center justify-center gap-1">
          <span>{data.status}</span>
          {data.status === "GAGAL" ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
        </div>
      </Badge>
    </TableCell>
    <TableCell>
        <div className="flex items-center gap-2">
            <Progress value={data.progress} className="w-24 h-3" />
            <span className="text-xs font-medium">{data.progress.toFixed(0)}%</span>
        </div>
    </TableCell>
  </TableRow>
);

export default function ProductivityHours({ data }: ProductivityHoursProps) {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>Productivity Hours</CardTitle>
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
                  <TableHead>Role</TableHead>
                  <TableHead>Jumlah</TableHead>
                  <TableHead>Total Order</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Hours</TableHead>
                  <TableHead>Target Order</TableHead>
                  <TableHead>Target Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <ProductivityRow role="Picker" data={data.picker} />
                <ProductivityRow role="Packer" data={data.packer} />
              </TableBody>
            </Table>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
