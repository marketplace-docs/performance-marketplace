'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, ThumbsDown, Pencil, Upload, Download, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAdmin } from '@/hooks/use-admin';
import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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
  const { 
    setEditingPerformance, 
    setIsProductivityFormOpen,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
  } = useAdmin();

  const handleEditClick = (item: PerformanceData) => {
    setEditingPerformance(item);
    setIsProductivityFormOpen(true);
  };
  
  const handleExport = () => {
    const csvRows = [
      ["id", "name", "job", "totalOrder", "totalQty", "targetOrder", "targetQuantity", "status"],
      ...data.performance.map(item => [
        item.id,
        item.name,
        item.job,
        item.totalOrder,
        item.totalQty,
        item.targetOrder,
        item.targetQuantity,
        item.status
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "marketplace_performance.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // Pagination logic
  const totalPages = Math.ceil(data.performance.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentItems = data.performance.slice(startIndex, endIndex);

  return (
    <div className="w-full">
        <h2 className="text-xl font-bold mb-4 text-center p-2 bg-destructive text-destructive-foreground rounded-lg">
            MARKETPLACE PERFORMANCE, {data.date}
        </h2>
        <div className="flex gap-2 mb-4">
            <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2" />
                Upload CSV
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".csv" />
            <Button onClick={handleExport}>
                <Download className="mr-2" />
                Export CSV
            </Button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            {currentItems.map((item) => (
                <Card key={item.id}>
                    <CardHeader className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-lg">{item.id}. {item.name || 'Unnamed'}</CardTitle>
                                <CardDescription>{item.job}</CardDescription>
                            </div>
                            <div className='flex items-center gap-2'>
                                <Badge className={cn("text-center font-bold", item.status === "GAGAL" ? "bg-yellow-400 text-black" : "bg-green-500")}>
                                    <div className="flex items-center justify-center gap-2">
                                        <span>{item.status}</span>
                                        {item.status === "GAGAL" ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                                    </div>
                                </Badge>
                                <Button variant="outline" size="icon" onClick={() => handleEditClick(item)}>
                                    <Pencil className='h-4 w-4'/>
                                </Button>
                            </div>
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
        <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Rows per page:</span>
                <Select
                    value={rowsPerPage.toString()}
                    onValueChange={(value) => {
                        setRowsPerPage(Number(value));
                        setCurrentPage(1);
                    }}
                >
                    <SelectTrigger className="w-20">
                        <SelectValue placeholder={rowsPerPage} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="30">30</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </span>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    </div>
  );
}
