'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/header';
import KeyMetrics from '@/components/dashboard/key-metrics';
import DailySummary from '@/components/dashboard/daily-summary';
import Backlog from '@/components/dashboard/backlog';
import AdminForm from '@/components/dashboard/admin-form';
import {
  initialMetrics,
  initialBacklogData,
  initialDailySummary,
} from '@/lib/data';

type Metrics = typeof initialMetrics;
type BacklogData = typeof initialBacklogData;
type DailySummaryData = typeof initialDailySummary;

const getFromLocalStorage = (key: string, initialValue: any) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return initialValue;
  }
};

export default function Home() {
  const [metrics, setMetrics] = useState<Metrics>(initialMetrics);
  const [backlogData, setBacklogData] = useState<BacklogData>(initialBacklogData);
  const [dailySummary, setDailySummary] = useState<DailySummaryData>(initialDailySummary);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setMetrics(getFromLocalStorage('metrics', initialMetrics));
    setBacklogData(getFromLocalStorage('backlogData', initialBacklogData));
    setDailySummary(getFromLocalStorage('dailySummary', initialDailySummary));
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem('metrics', JSON.stringify(metrics));
        window.localStorage.setItem('backlogData', JSON.stringify(backlogData));
        window.localStorage.setItem('dailySummary', JSON.stringify(dailySummary));
      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, metrics, backlogData, dailySummary]);

  const handleDataUpdate = (newForecast: number, newOos: number) => {
    setMetrics((prevMetrics) => ({
      ...prevMetrics,
      forecast: newForecast,
      oos: newOos,
    }));
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <KeyMetrics metrics={metrics} />
          <DailySummary data={dailySummary} />
        </div>
        <Backlog data={backlogData} />

        {/* Admin Form can be re-integrated if needed */}
        {/* <div className="max-w-md ml-auto">
          <AdminForm onDataSubmit={handleDataUpdate} />
        </div> */}
      </main>
    </div>
  );
}
