'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { initialMetrics, initialBacklogData, initialDailySummary, initialHourlyBacklog, initialPerformanceData } from '@/lib/data';

type Metrics = typeof initialMetrics;
type BacklogData = typeof initialBacklogData;
type DailySummaryData = typeof initialDailySummary;
type HourlyBacklogData = typeof initialHourlyBacklog;
type PerformanceData = Omit<typeof initialPerformanceData, 'averageHours'>;

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

type AdminContextType = {
  metrics: Metrics;
  backlogData: BacklogData;
  dailySummary: DailySummaryData;
  hourlyBacklog: HourlyBacklogData;
  performanceData: PerformanceData;
  isClient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  handleMetricsUpdate: (data: Partial<Metrics>) => void;
  handleBacklogUpdate: (data: any) => void;
  handleHourlyBacklogUpdate: (data: { hourlyData: { hour: string; value: number }[] }) => void;
  handlePerformanceUpdate: (data: Partial<PerformanceData>) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [metrics, setMetrics] = useState<Metrics>(() => getFromLocalStorage('metrics', initialMetrics));
  const [backlogData, setBacklogData] = useState<BacklogData>(() => getFromLocalStorage('backlogData', initialBacklogData));
  const [dailySummary, setDailySummary] = useState<DailySummaryData>(() => getFromLocalStorage('dailySummary', initialDailySummary));
  const [hourlyBacklog, setHourlyBacklog] = useState<HourlyBacklogData>(() => getFromLocalStorage('hourlyBacklog', initialHourlyBacklog));
  const [performanceData, setPerformanceData] = useState<PerformanceData>(() => getFromLocalStorage('performanceData', initialPerformanceData));

  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem('metrics', JSON.stringify(metrics));
        window.localStorage.setItem('backlogData', JSON.stringify(backlogData));
        window.localStorage.setItem('dailySummary', JSON.stringify(dailySummary));
        window.localStorage.setItem('hourlyBacklog', JSON.stringify(hourlyBacklog));
        window.localStorage.setItem('performanceData', JSON.stringify(performanceData));
      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, metrics, backlogData, dailySummary, hourlyBacklog, performanceData]);

  const handleMetricsUpdate = (data: Partial<Metrics>) => {
    setMetrics((prevMetrics) => {
      const newMetrics = { ...prevMetrics, ...data };
      
      const forecast = newMetrics.forecast || 0;
      const actual = newMetrics.actual || 0;

      newMetrics.fulfillmentRate = forecast > 0 ? (actual / forecast) * 100 : 0;
      newMetrics.progress = actual;

      newMetrics.actualVsForecast = forecast > 0 ? (actual / forecast) * 100 : 0;
      newMetrics.oosVsForecast = forecast > 0 ? (newMetrics.oos / forecast) * 100 : 0;
      newMetrics.actualOOSVsForecast = forecast > 0 ? (newMetrics.actualOOS / forecast) * 100 : 0;

      return newMetrics;
    });

    setDailySummary((prevSummary) => {
       const newDay2 = { ...prevSummary.day1, day: 2 };

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
    setIsDialogOpen(false);
  };

  const handleBacklogUpdate = (data: any) => {
    setBacklogData(prevData => {
      const newTypes = [...prevData.types];
      const marketplaceData = newTypes[0];

      const updateStatus = (status: 'paymentAccepted' | 'inProgress' | 'picked' | 'packed') => {
        const order = data[status]?.order ?? marketplaceData.statuses[status].order;
        const item = data[status]?.item ?? marketplaceData.statuses[status].item;
        const avg = order > 0 ? item / order : 0;
        marketplaceData.statuses[status] = { order, item, avg };
      };

      updateStatus('paymentAccepted');
      updateStatus('inProgress');
      updateStatus('picked');
      updateStatus('packed');

      return { ...prevData, types: newTypes };
    });
    setIsDialogOpen(false);
  };
  
  const handleHourlyBacklogUpdate = (data: { hourlyData: { hour: string; value: number }[] }) => {
    setHourlyBacklog(data.hourlyData);
    setIsDialogOpen(false);
  };

  const handlePerformanceUpdate = (data: Partial<PerformanceData>) => {
    setPerformanceData(prevData => ({
      ...prevData,
      ...data,
    }));
    setIsDialogOpen(false);
  }

  const value = {
    metrics,
    backlogData,
    dailySummary,
    hourlyBacklog,
    performanceData: performanceData,
    isClient,
    isDialogOpen,
    setIsDialogOpen,
    handleMetricsUpdate,
    handleBacklogUpdate,
    handleHourlyBacklogUpdate,
    handlePerformanceUpdate
  }

  return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
