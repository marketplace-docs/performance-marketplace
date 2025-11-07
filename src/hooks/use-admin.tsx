'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { initialMetrics, initialBacklogData, initialDailySummary, initialHourlyBacklog, initialPerformanceData, initialProductivityData } from '@/lib/data';
import Papa from 'papaparse';
import { format } from 'date-fns';

type Metrics = typeof initialMetrics;
type BacklogData = typeof initialBacklogData;
type DailySummaryData = typeof initialDailySummary;
type HourlyBacklogData = typeof initialHourlyBacklog;
type PerformanceData = Omit<typeof initialPerformanceData, 'averageHours'>;
type ProductivityData = typeof initialProductivityData;
type PerformanceItem = ProductivityData['performance'][0];

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
  performanceData: PerformanceData & { totalPacked: number, averageHoursPacked: number };
  productivityData: ProductivityData;
  isClient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  isProductivityFormOpen: boolean;
  setIsProductivityFormOpen: (isOpen: boolean) => void;
  editingPerformance: PerformanceItem | null;
  setEditingPerformance: (item: PerformanceItem | null) => void;
  handleMetricsUpdate: (data: { forecast: number }) => void;
  handleBacklogUpdate: (data: any) => void;
  handleHourlyBacklogUpdate: (data: { hourlyData: { hour: string; value: number }[] }) => void;
  handlePerformanceUpdate: (data: Partial<Omit<PerformanceData, 'totalPacked' | 'averageHoursPacked'>>) => void;
  handleProductivityUpdate: (data: PerformanceItem) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductivityReset: () => void;
  handleProductivityDelete: (id: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void;
  productivityDate: Date;
  setProductivityDate: (date: Date) => void;
};

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [metrics, setMetrics] = useState<Metrics>(() => getFromLocalStorage('metrics', initialMetrics));
  const [backlogData, setBacklogData] = useState<BacklogData>(() => getFromLocalStorage('backlogData', initialBacklogData));
  const [dailySummary, setDailySummary] = useState<DailySummaryData>(() => getFromLocalStorage('dailySummary', initialDailySummary));
  const [hourlyBacklog, setHourlyBacklog] = useState<HourlyBacklogData>(() => getFromLocalStorage('hourlyBacklog', initialHourlyBacklog));
  const [performanceData, setPerformanceData] = useState<PerformanceData>(() => getFromLocalStorage('performanceData', initialPerformanceData));
  const [productivityData, setProductivityData] = useState<ProductivityData>(() => getFromLocalStorage('productivityData', initialProductivityData));
  const [productivityDate, setProductivityDate] = useState<Date>(() => {
    const savedDate = getFromLocalStorage('productivityDate', null);
    return savedDate ? new Date(savedDate) : new Date();
  });


  const [isClient, setIsClient] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isProductivityFormOpen, setIsProductivityFormOpen] = useState(false);
  const [editingPerformance, setEditingPerformance] = useState<PerformanceItem | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState<number>(() => getFromLocalStorage('rowsPerPage', 8));

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { totalPacked, averageHoursPacked } = useMemo(() => {
    const total = hourlyBacklog.reduce((sum, item) => sum + item.value, 0);
    const activeHours = hourlyBacklog.filter(item => item.value > 0).length;
    const average = activeHours > 0 ? total / activeHours : 0;
    return { totalPacked: total, averageHoursPacked: Math.round(average) };
  }, [hourlyBacklog]);

  useEffect(() => {
    if (isClient) {
      try {
        const newMetrics = { ...metrics, actual: totalPacked, fulfillmentRate: metrics.forecast > 0 ? (dailySummary.day1.actual / metrics.forecast) * 100 : 0 };
        
        const newDailySummary = {
          day1: { day: 1, actual: totalPacked, total: totalPacked },
          day2: { day: 2, actual: 0, total: 0 },
        };

        if (JSON.stringify(newMetrics) !== JSON.stringify(metrics)) {
            setMetrics(newMetrics);
        }
        if (JSON.stringify(newDailySummary) !== JSON.stringify(dailySummary)) {
            setDailySummary(newDailySummary);
        }

        window.localStorage.setItem('metrics', JSON.stringify(newMetrics));
        window.localStorage.setItem('backlogData', JSON.stringify(backlogData));
        window.localStorage.setItem('dailySummary', JSON.stringify(newDailySummary));
        window.localStorage.setItem('hourlyBacklog', JSON.stringify(hourlyBacklog));
        window.localStorage.setItem('performanceData', JSON.stringify(performanceData));
        window.localStorage.setItem('productivityData', JSON.stringify(productivityData));
        window.localStorage.setItem('productivityDate', JSON.stringify(productivityDate));
        window.localStorage.setItem('rowsPerPage', JSON.stringify(rowsPerPage));

      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, totalPacked, metrics, backlogData, dailySummary, hourlyBacklog, performanceData, productivityData, productivityDate, rowsPerPage]);

  const handleMetricsUpdate = (data: { forecast: number }) => {
    setMetrics((prevMetrics) => {
        const newMetrics = { ...prevMetrics, forecast: data.forecast, actual: totalPacked };
        newMetrics.fulfillmentRate = data.forecast > 0 ? (dailySummary.day1.actual / data.forecast) * 100 : 0;
        return newMetrics;
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

  const handlePerformanceUpdate = (data: Partial<Omit<PerformanceData, 'totalPacked' | 'averageHoursPacked'>>) => {
    setPerformanceData(prevData => ({
      ...prevData,
      ...data,
    }));
    setIsDialogOpen(false);
  };

  const handleProductivityUpdate = (updatedItem: PerformanceItem) => {
    setProductivityData(prevData => {
        const newPerformance = prevData.performance.map(item => {
            if (item.id === updatedItem.id) {
                const newItem = { ...item, ...updatedItem };
                newItem.status = newItem.totalOrder >= newItem.targetOrder ? 'BERHASIL' : 'GAGAL';
                return newItem;
            }
            return item;
        });
        return { ...prevData, performance: newPerformance };
    });
    setIsProductivityFormOpen(false);
    setEditingPerformance(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const uploadedData = results.data as any[];
          setProductivityData(prevData => {
            const newPerformance = prevData.performance.map(item => {
              const found = uploadedData.find(row => parseInt(row.id) === item.id);
              if (found) {
                const totalOrder = parseInt(found.totalOrder) || item.totalOrder;
                const totalQty = parseInt(found.totalQty) || item.totalQty;
                const targetOrder = parseInt(found.targetOrder) || item.targetOrder;
                
                const updatedItem = {
                  ...item,
                  name: found.name || item.name,
                  job: found.job || item.job,
                  totalOrder,
                  totalQty,
                };
                updatedItem.status = totalOrder >= targetOrder ? 'BERHASIL' : 'GAGAL';
                return updatedItem;
              }
              return item;
            });
            return { ...prevData, performance: newPerformance };
          });
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
  };
  
  const handleProductivityReset = () => {
    setProductivityData({
      ...initialProductivityData,
      performance: initialProductivityData.performance.map(p => ({ ...p, name: "", totalOrder: 0, totalQty: 0, status: "GAGAL" }))
    });
    setCurrentPage(1);
  };

  const handleProductivityDelete = (id: number) => {
    setProductivityData(prevData => {
      const newPerformance = prevData.performance.map(item => {
        if (item.id === id) {
          return {
            ...item,
            name: '',
            totalOrder: 0,
            totalQty: 0,
            status: 'GAGAL',
          };
        }
        return item;
      });
      return { ...prevData, performance: newPerformance };
    });
  };

  const value = {
    metrics,
    backlogData,
    dailySummary,
    hourlyBacklog,
    performanceData: { ...performanceData, totalPacked, averageHoursPacked },
    productivityData,
    isClient,
    isDialogOpen,
    setIsDialogOpen,
    isProductivityFormOpen,
    setIsProductivityFormOpen,
    editingPerformance,
    setEditingPerformance,
    handleMetricsUpdate,
    handleBacklogUpdate,
    handleHourlyBacklogUpdate,
    handlePerformanceUpdate,
    handleProductivityUpdate,
    handleFileUpload,
    handleProductivityReset,
    handleProductivityDelete,
    currentPage,
    setCurrentPage,
    rowsPerPage,
    setRowsPerPage,
    productivityDate,
    setProductivityDate,
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
