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
import ProductivityDashboard from "./dashboard/productivity-dashboard";
import ProductivityForm from "./dashboard/productivity-form";

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
        isProductivityDialogOpen,
        setIsProductivityDialogOpen,
        productivityData,
        isProductivityFormOpen,
        setIsProductivityFormOpen,
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
        <Dialog open={isProductivityDialogOpen} onOpenChange={setIsProductivityDialogOpen}>
            <DialogContent className="max-w-4xl">
                <DialogHeader>
                    <DialogTitle>Marketplace Performance</DialogTitle>
                </DialogHeader>
                <ProductivityDashboard data={productivityData} />
            </DialogContent>
        </Dialog>
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
