'use client';

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
import { ScrollArea } from '../ui/scroll-area';


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

const PerformanceCard = ({ item, onEditClick }: { item: PerformanceData, onEditClick: (item: PerformanceData) => void }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-medium">{item.name || '-'}</p>
            <p className="text-sm text-muted-foreground">{item.job}</p>
          </div>
          <div className="flex items-center justify-end gap-2">
            <Badge className={cn("text-center font-bold", item.status === "GAGAL" ? "bg-yellow-400 text-black" : "bg-green-500")}>
              <div className="flex items-center justify-center gap-1">
                <span>{item.status}</span>
                {item.status === "GAGAL" ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
              </div>
            </Badge>
            <Button variant="outline" size="icon" onClick={() => onEditClick(item)}>
              <Pencil className='h-4 w-4' />
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4 text-center">
            <div>
                <p className="text-xs text-muted-foreground">Total Order / Qty</p>
                <p className="font-bold">{item.totalOrder.toLocaleString()} / {item.totalQty.toLocaleString()}</p>
            </div>
            <div>
                <p className="text-xs text-destructive">Target Order / Qty</p>
                <p className="font-bold text-destructive">{item.targetOrder.toLocaleString()} / {item.targetQuantity.toLocaleString()}</p>
            </div>
        </div>
      </CardContent>
    </Card>
);

export default function ProductivityDashboard({ data }: ProductivityDashboardProps) {
  const { 
    setEditingPerformance, 
    setIsProductivityFormOpen,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    handleFileUpload,
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
    <Card className="w-full">
      <CardHeader>
        <div className="flex gap-2 pb-4">
            <Button onClick={() => fileInputRef.current?.click()}>
                <Upload className="mr-2" />
                Upload CSV
            </Button>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept=".csv" 
              onChange={handleFileUpload}
            />
            <Button onClick={handleExport}>
                <Download className="mr-2" />
                Export CSV
            </Button>
        </div>
        <CardTitle className="text-xl font-bold text-center p-2 bg-destructive text-destructive-foreground rounded-lg">
          MARKETPLACE PERFORMANCE, {data.date}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
            {currentItems.map((item) => (
                <PerformanceCard key={item.id} item={item} onEditClick={handleEditClick} />
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
      </CardContent>
    </Card>
  );
}