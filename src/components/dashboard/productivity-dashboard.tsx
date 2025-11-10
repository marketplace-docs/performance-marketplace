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
import { ThumbsUp, ThumbsDown, Pencil, Upload, Download, ChevronLeft, ChevronRight, RefreshCcw, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { useAdmin } from '@/hooks/use-admin';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Calendar } from '../ui/calendar';
import { format } from 'date-fns';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { initialProductivityData } from '@/lib/data';
import { Progress } from '../ui/progress';

type PerformanceData = {
  id: number;
  name: string;
  job: string;
  totalOrder: number;
  totalQty: number;
  targetOrder: number;
  targetQuantity: number;
  status: string;
  progress: number;
};

type ProductivityDashboardProps = {
  data: {
    performance: PerformanceData[];
  };
};

const PerformanceTable = ({
  items,
  startIndex,
  handleEditClick,
  handleProductivityDelete,
}: {
  items: PerformanceData[];
  startIndex: number;
  handleEditClick: (item: PerformanceData) => void;
  handleProductivityDelete: (id: number) => void;
}) => (
  <div className="mt-4 border rounded-lg overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>NO</TableHead>
          <TableHead>NAME</TableHead>
          <TableHead>TOTAL ORDER</TableHead>
          <TableHead>TOTAL QTY</TableHead>
          <TableHead>TARGET ORDER</TableHead>
          <TableHead>TARGET QTY</TableHead>
          <TableHead>PROGRESS</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead>ACTION</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{startIndex + index + 1}</TableCell>
            <TableCell>{item.name || '-'}</TableCell>
            <TableCell>{item.totalOrder.toLocaleString()}</TableCell>
            <TableCell>{item.totalQty.toLocaleString()}</TableCell>
            <TableCell className="text-destructive font-bold">{item.targetOrder.toLocaleString()}</TableCell>
            <TableCell className="text-destructive font-bold">{item.targetQuantity.toLocaleString()}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                  <Progress value={item.progress} className="w-24 h-3" />
                  <span className="text-xs font-medium">{item.progress.toFixed(0)}%</span>
              </div>
            </TableCell>
            <TableCell>
              <Badge className={cn("text-center font-bold", item.status === "GAGAL" ? "bg-yellow-400 text-black hover:bg-yellow-500" : "bg-green-500 hover:bg-green-600")}>
                <div className="flex items-center justify-center gap-1">
                  <span>{item.status}</span>
                  {item.status === "GAGAL" ? <ThumbsDown className="h-4 w-4" /> : <ThumbsUp className="h-4 w-4" />}
                </div>
              </Badge>
            </TableCell>
            <TableCell className="flex gap-2">
              <Button variant="outline" size="icon" onClick={() => handleEditClick(item)}>
                <Pencil className='h-4 w-4' />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="icon">
                    <Trash2 className='h-4 w-4' />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to delete this entry?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will reset the data for {item.name || `entry ${item.id}`}. You can re-enter the data manually or via CSV upload.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleProductivityDelete(item.id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
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
    handleFileUpload,
    handleProductivityReset,
    handleProductivityDelete,
    handleProductivityDeleteAll,
    productivityDate,
    setProductivityDate,
  } = useAdmin();

  const handleEditClick = (item: PerformanceData) => {
    setEditingPerformance(item);
    setIsProductivityFormOpen(true);
  };
  
  const handleExport = (job: 'Picker' | 'Packer') => {
    // Always export the template based on the initial structure
    const templateItems = initialProductivityData.performance.filter(p => p.job === job);
    
    const csvRows = [
      // Headers
      ["id", "name", "job", "totalOrder", "totalQty"],
      // Data - empty rows from template
      ...templateItems.map(item => [
        item.id,
        "", // name
        item.job,
        0, // totalOrder
        0, // totalQty
      ])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `template_${job.toLowerCase()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const pickers = data.performance.filter(p => p.job === 'Picker');
  const packers = data.performance.filter(p => p.job === 'Packer');

  const totalPages = Math.ceil(Math.max(pickers.length, packers.length) / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  
  const currentPickers = pickers.slice(startIndex, startIndex + rowsPerPage);
  const currentPackers = packers.slice(startIndex, startIndex + rowsPerPage);

  const onTabChange = () => {
    setCurrentPage(1);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-wrap gap-2 pb-4">
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
            <Button onClick={() => handleExport('Picker')}>
                <Download className="mr-2" />
                Template Picker
            </Button>
            <Button onClick={() => handleExport('Packer')}>
                <Download className="mr-2" />
                Template Packer
            </Button>
             <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline">
                  <RefreshCcw className="mr-2" />
                  Reset Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will reset all performance data to its initial state.
                    This will restore the default empty rows.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleProductivityReset}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">
                  <Trash2 className="mr-2" />
                  Delete All
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete all data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action will permanently delete all performance entries. This cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleProductivityDeleteAll}>Delete All</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
        <CardTitle className="relative text-xl font-bold text-center p-2 bg-destructive text-destructive-foreground rounded-lg">
          MARKETPLACE PERFORMANCE, {format(productivityDate, 'd MMMM yyyy').toUpperCase()}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="absolute top-1/2 right-2 -translate-y-1/2 text-destructive-foreground hover:bg-white/20 hover:text-destructive-foreground">
                <Pencil className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={productivityDate}
                onSelect={(date) => date && setProductivityDate(date)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="picker" className="w-full" onValueChange={onTabChange}>
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="picker">Picker</TabsTrigger>
                <TabsTrigger value="packer">Packer</TabsTrigger>
            </TabsList>
            <TabsContent value="picker">
                <PerformanceTable 
                    items={currentPickers} 
                    startIndex={startIndex}
                    handleEditClick={handleEditClick}
                    handleProductivityDelete={handleProductivityDelete}
                />
            </TabsContent>
            <TabsContent value="packer">
                <PerformanceTable 
                    items={currentPackers} 
                    startIndex={startIndex}
                    handleEditClick={handleEditClick}
                    handleProductivityDelete={handleProductivityDelete}
                />
            </TabsContent>
        </Tabs>
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
                        <SelectItem value="8">8</SelectItem>
                        <SelectItem value="12">12</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                        <SelectItem value="100">100</SelectItem>
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
