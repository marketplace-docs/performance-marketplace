'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
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

const PerformanceItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex justify-between items-center text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-semibold">{typeof value === 'number' ? value.toLocaleString() : value}</span>
    </div>
);


export default function ProductivityDashboard({ data }: ProductivityDashboardProps) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center p-2 bg-destructive text-destructive-foreground rounded-lg">
        MARKETPLACE PERFORMANCE, {data.date}
      </h2>
      <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
        {data.performance.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-lg">{item.id}. {item.name || 'Unnamed'}</CardTitle>
                        <CardDescription>{item.job}</CardDescription>
                    </div>
                    <Badge className={cn("text-center font-bold", item.status === "GAGAL" ? "bg-yellow-400 text-black" : "bg-green-500")}>
                        <div className="flex items-center justify-center gap-2">
                            <span>{item.status}</span>
                            {item.status === "GAGAL" && <ThumbsDown className="h-4 w-4" />}
                        </div>
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 space-y-2">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold mb-1 text-center">Actual</h4>
                        <PerformanceItem label="Total Order" value={item.totalOrder} />
                        <PerformanceItem label="Total Qty" value={item.totalQty} />
                    </div>
                    <div className="border-l pl-4">
                        <h4 className="font-semibold mb-1 text-center text-red-500">Target</h4>
                        <PerformanceItem label="Target Order" value={item.targetOrder} />
                        <PerformanceItem label="Target Qty" value={item.targetQuantity} />
                    </div>
                </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}