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
    if (typeof window !== 'undefined') {
      setMetrics(getFromLocalStorage('metrics', initialMetrics));
      setBacklogData(getFromLocalStorage('backlogData', initialBacklogData));
      setDailySummary(getFromLocalStorage('dailySummary', initialDailySummary));
    }
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

  const handleDataUpdate = (data: Partial<Metrics>) => {
    setMetrics((prevMetrics) => {
      const newMetrics = { ...prevMetrics, ...data };
      
      const forecast = newMetrics.forecast || 0;
      const actual = newMetrics.actual || 0;
      const oos = newMetrics.oos || 0;
      const actualOOS = newMetrics.actualOOS || 0;

      newMetrics.fulfillmentRate = forecast > 0 ? (actual / forecast) * 100 : 0;
      newMetrics.progress = actual;

      newMetrics.actualVsForecast = forecast > 0 ? (actual / forecast) * 100 : 0;
      newMetrics.oosVsForecast = forecast > 0 ? (oos / forecast) * 100 : 0;
      newMetrics.actualOOSVsForecast = forecast > 0 ? (actualOOS / forecast) * 100 : 0;

      return newMetrics;
    });

    setDailySummary((prevSummary) => {
      // Data "Day 1" sebelumnya menjadi data "Day 2" yang baru
      const newDay2 = { ...prevSummary.day1, day: 2 };

      // Data "Day 1" yang baru mengambil dari input form
      const newDay1 = {
        day: 1,
        actual: data.actual !== undefined ? data.actual : prevSummary.day1.actual,
        total: data.actual !== undefined ? data.actual : prevSummary.day1.actual,
      };

      return {
        day1: newDay1,
        day2: newDay2,
      };
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2">
            <KeyMetrics metrics={metrics} />
          </div>
          <div className="flex flex-col gap-4">
            <DailySummary data={dailySummary} />
            <AdminForm onDataSubmit={handleDataUpdate} />
          </div>
        </div>
        <Backlog data={backlogData} />
      </main>
    </div>
  );
}
