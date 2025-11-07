'use client';

import { useState } from 'react';
import KeyMetrics from '@/components/dashboard/key-metrics';
import DailySummary from '@/components/dashboard/daily-summary';
import Backlog from '@/components/dashboard/backlog';
import { useAdmin } from '@/hooks/use-admin';
import ProductivityMenu from '@/components/dashboard/productivity-menu';
import ProductivityDashboard from '@/components/dashboard/productivity-dashboard';
import ProductivityHours from '@/components/dashboard/productivity-hours';

type Metrics = {
  forecast: number;
  actual: number;
  fulfillmentRate: number;
  totalPacked: number;
};

export default function Home() {
  const { metrics, dailySummary, hourlyBacklog, productivityData, isClient, productivityHoursData } = useAdmin();

  if (!isClient) {
    return null;
  }

  return (
    <main className="flex-1 space-y-4 p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <KeyMetrics metrics={metrics as Metrics} />
        </div>
        <div className="flex flex-col gap-4">
          <DailySummary data={dailySummary} />
        </div>
      </div>
      <Backlog hourlyData={hourlyBacklog} />
      <ProductivityMenu>
        <ProductivityDashboard data={productivityData} />
      </ProductivityMenu>
      <ProductivityHours data={productivityHoursData} />
    </main>
  );
}
