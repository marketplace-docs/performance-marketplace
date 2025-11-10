'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Settings, Upload, Download } from 'lucide-react';
import AdminForm from "./dashboard/admin-form";
import { useAdmin } from "@/hooks/use-admin";
import ProductivityForm from "./dashboard/productivity-form";
import React from "react";

export default function Header() {
    const { 
        isDialogOpen, 
        setIsDialogOpen, 
        handleMetricsUpdate, 
        handleHourlyBacklogUpdate, 
        hourlyBacklog,
        metrics,
        isProductivityFormOpen,
        setIsProductivityFormOpen,
        handleOrderStatusUpload,
        handleOrderStatusTemplateExport,
    } = useAdmin();
    const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="sticky top-0 h-16 flex items-center justify-between border-b bg-card px-4 md:px-6 z-50">
      <h1 className="text-2xl font-bold text-foreground">
        Monitoring Marketplace
      </h1>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline" onClick={() => fileInputRef.current?.click()}>
            <Upload className="mr-2 h-4 w-4" />
            Upload Order Status
        </Button>
        <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".csv"
            onChange={handleOrderStatusUpload}
        />
        <Button size="sm" variant="outline" onClick={handleOrderStatusTemplateExport}>
            <Download className="mr-2 h-4 w-4" />
            Template
        </Button>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Settings className="mr-2 h-4 w-4" />
                Admin Controls
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-xl">
              <DialogHeader>
                <DialogTitle>Admin Controls</DialogTitle>
              </DialogHeader>
              <AdminForm 
                onMetricsSubmit={handleMetricsUpdate} 
                onHourlyBacklogSubmit={handleHourlyBacklogUpdate}
                hourlyData={hourlyBacklog}
                metrics={metrics}
              />
            </DialogContent>
          </Dialog>
        </div>
        
        <Dialog open={isProductivityFormOpen} onOpenChange={setIsProductivityFormOpen}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Performance</DialogTitle>
                </DialogHeader>
                <ProductivityForm />
            </DialogContent>
        </Dialog>
    </header>
  );
}
