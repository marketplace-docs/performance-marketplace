'use client';

import { useState, useEffect } from 'react';
import KeyMetrics from '@/components/dashboard/key-metrics';
import DailySummary from '@/components/dashboard/daily-summary';
import Backlog from '@/components/dashboard/backlog';
import { useAdmin } from '@/hooks/use-admin';

type Metrics = {
  forecast: number;
  actual: number;
  oos: number;
  actualOOS: number;
  fulfillmentRate: number;
  progress: number;
  actualVsForecast: number;
  oosVsForecast: number;
  actualOOSVsForecast: number;
};

export default function Home() {
  const { metrics, backlogData, dailySummary, isClient } = useAdmin();

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
      <Backlog data={backlogData} />
    </main>
  );
}
