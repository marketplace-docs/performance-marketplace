'use client';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';
import AdminForm from "./dashboard/admin-form";
import { useAdmin } from "@/hooks/use-admin";

export default function Header() {
    const { 
        isDialogOpen, 
        setIsDialogOpen, 
        handleMetricsUpdate, 
        handleBacklogUpdate,
        handleHourlyBacklogUpdate, 
        handlePerformanceUpdate,
        backlogData,
        hourlyBacklog,
        performanceData,
        metrics,
    } = useAdmin();

  return (
    <header className="sticky top-0 h-16 flex items-center justify-between border-b bg-card px-4 md:px-6 z-50">
      <h1 className="text-2xl font-bold text-foreground">
        Monitoring Marketplace
      </h1>
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
              onBacklogSubmit={handleBacklogUpdate} 
              onHourlyBacklogSubmit={handleHourlyBacklogUpdate}
              onPerformanceSubmit={handlePerformanceUpdate}
              backlogData={backlogData}
              hourlyData={hourlyBacklog}
              performanceData={performanceData}
              metrics={metrics}
            />
          </DialogContent>
        </Dialog>
    </header>
  );
}
