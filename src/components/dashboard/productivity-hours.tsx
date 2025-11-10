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
import { ChevronDown, ChevronUp, RefreshCcw } from 'lucide-react';
import { Progress } from '../ui/progress';
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


type RoleData = {
  jumlah: number;
  totalOrder: number;
  totalQuantity: number;
  averageOrderHours: number;
  averageQuantityHours: number;
  targetOrder: number;
  targetQuantity: number;
  targetEndShiftOrder: number;
  targetEndShiftQuantity: number;
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
    <TableCell>{formatNumber(data.averageOrderHours)}</TableCell>
    <TableCell>{formatNumber(data.averageQuantityHours)}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetOrder.toLocaleString()}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetQuantity.toLocaleString()}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetEndShiftOrder.toLocaleString()}</TableCell>
    <TableCell className="text-destructive font-bold">{data.targetEndShiftQuantity.toLocaleString()}</TableCell>
    <TableCell>
        <div className="flex items-center gap-2">
            <Progress value={data.progress} className="w-24 h-3" />
            <span className="text-xs font-medium">{data.progress.toFixed(0)}%</span>
        </div>
    </TableCell>
    <TableCell>
      <Badge className={cn("text-center font-bold", data.status === "GAGAL" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-green-500 hover:bg-green-600")}>
        <div className="flex items-center justify-center gap-1">
          <span>{data.status}</span>
          {data.status === "GAGAL" ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
        </div>
      </Badge>
    </TableCell>
  </TableRow>
);

export default function ProductivityHours({ data }: ProductivityHoursProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  // Note: Resetting productivity hours is handled by resetting the main productivity data.
  // A separate reset function is not needed here as this component is derived state.

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Productivity Hours</CardTitle>
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
                  <TableHead>Role</TableHead>
                  <TableHead>Manpower</TableHead>
                  <TableHead>Total Order</TableHead>
                  <TableHead>Total Quantity</TableHead>
                  <TableHead>Avg Order Hours</TableHead>
                  <TableHead>Avg Quantity Hours</TableHead>
                  <TableHead>Hourly Standard Order</TableHead>
                  <TableHead>Hourly Standard Quantity</TableHead>
                  <TableHead>End Shift Standard Order</TableHead>
                  <TableHead>End Shift Standard Quantity</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
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
