'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { initialMetrics, initialDailySummary, initialHourlyBacklog, initialPerformanceData, initialProductivityData, initialProductivityHoursData } from '@/lib/data';
import Papa from 'papaparse';
import { format } from 'date-fns';

type Metrics = typeof initialMetrics;
type DailySummaryData = typeof initialDailySummary;
type HourlyBacklogData = typeof initialHourlyBacklog;
type PerformanceData = Omit<typeof initialPerformanceData, 'averageHours'>;
type ProductivityData = typeof initialProductivityData;
type PerformanceItem = ProductivityData['performance'][0];
type ProductivityHoursData = typeof initialProductivityHoursData;


const getFromLocalStorage = (key: string, initialValue: any) => {
  if (typeof window === 'undefined') {
    return initialValue;
  }
  try {
    const item = window.localStorage.getItem(key);
    // When resetting, the value might be an empty array which is valid.
    if (key === 'productivityData' && item) {
      const parsed = JSON.parse(item);
      if (!parsed.performance) {
        return { performance: [] };
      }
      return parsed;
    }
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return initialValue;
  }
};

type AdminContextType = {
  metrics: Metrics & { totalPacked: number };
  dailySummary: DailySummaryData;
  hourlyBacklog: HourlyBacklogData;
  performanceData: PerformanceData & { totalPacked: number, averageHoursPacked: number };
  productivityData: ProductivityData;
  productivityHoursData: ProductivityHoursData;
  isClient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  isProductivityFormOpen: boolean;
  setIsProductivityFormOpen: (isOpen: boolean) => void;
  editingPerformance: PerformanceItem | null;
  setEditingPerformance: (item: PerformanceItem | null) => void;
  handleMetricsUpdate: (data: { forecast: number }) => void;
  handleHourlyBacklogUpdate: (data: { hourlyData: { hour: string; value: number }[] }) => void;
  handlePerformanceUpdate: (data: Partial<Omit<PerformanceData, 'totalPacked' | 'averageHoursPacked'>>) => void;
  handleProductivityUpdate: (data: PerformanceItem) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductivityReset: () => void;
  handleProductivityDelete: (id: number) => void;
  handleProductivityDeleteAll: () => void;
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
  const [dailySummary, setDailySummary] = useState<DailySummaryData>(() => getFromLocalStorage('dailySummary', initialDailySummary));
  const [hourlyBacklog, setHourlyBacklog] = useState<HourlyBacklogData>(() => getFromLocalStorage('hourlyBacklog', initialHourlyBacklog));
  const [performanceData, setPerformanceData] = useState<PerformanceData>(() => getFromLocalStorage('performanceData', initialPerformanceData));
  const [productivityData, setProductivityData] = useState<ProductivityData>(() => getFromLocalStorage('productivityData', { performance: [] }));
  const [productivityHoursData, setProductivityHoursData] = useState<ProductivityHoursData>(() => getFromLocalStorage('productivityHoursData', initialProductivityHoursData));

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
    const newHoursData = { ...initialProductivityHoursData };
    const performance = productivityData.performance || [];
    const workingHours = 10;
    
    const pickers = performance.filter(p => p.job === 'Picker');
    const packers = performance.filter(p => p.job === 'Packer');
    
    const pickerCount = pickers.filter(p => p.name).length;
    const pickerTotalOrder = pickers.reduce((sum, p) => sum + p.totalOrder, 0);
    const pickerTotalQty = pickers.reduce((sum, p) => sum + p.totalQty, 0);
    const pickerTargetOrder = 750;
    const pickerTargetQty = 1085;
    const pickerTargetEndShiftOrder = pickerTargetOrder;
    
    newHoursData.picker = {
        jumlah: pickerCount,
        totalOrder: pickerTotalOrder,
        totalQuantity: pickerTotalQty,
        averageOrderHours: pickerCount > 0 ? Math.round(pickerTotalOrder / pickerCount) : 0,
        averageQuantityHours: pickerCount > 0 ? Math.round(pickerTotalQty / pickerCount) : 0,
        targetOrder: pickerTargetOrder,
        targetQuantity: pickerTargetQty,
        targetEndShiftOrder: pickerTargetEndShiftOrder * workingHours,
        targetEndShiftQuantity: pickerTargetQty * workingHours,
        status: pickerTotalOrder >= pickerTargetEndShiftOrder * workingHours ? 'BERHASIL' : 'GAGAL',
        progress: pickerTargetEndShiftOrder > 0 ? (pickerTotalOrder / (pickerTargetEndShiftOrder * workingHours)) * 100 : 0,
    };
    
    const packerCount = packers.filter(p => p.name).length;
    const packerTotalOrder = packers.reduce((sum, p) => sum + p.totalOrder, 0);
    const packerTotalQty = packers.reduce((sum, p) => sum + p.totalQty, 0);
    const packerTargetOrder = 725;
    const packerTargetQty = 975;
    const packerTargetEndShiftOrder = packerTargetOrder;

    newHoursData.packer = {
      jumlah: packerCount,
      totalOrder: packerTotalOrder,
      totalQuantity: packerTotalQty,
      averageOrderHours: packerCount > 0 ? Math.round(packerTotalOrder / packerCount) : 0,
      averageQuantityHours: packerCount > 0 ? Math.round(packerTotalQty / packerCount) : 0,
      targetOrder: packerTargetOrder,
      targetQuantity: packerTargetQty,
      targetEndShiftOrder: packerTargetEndShiftOrder * workingHours,
      targetEndShiftQuantity: packerTargetQty * workingHours,
      status: packerTotalOrder >= packerTargetEndShiftOrder * workingHours ? 'BERHASIL' : 'GAGAL',
      progress: packerTargetEndShiftOrder > 0 ? (packerTotalOrder / (packerTargetEndShiftOrder * workingHours)) * 100 : 0,
    };

    setProductivityHoursData(newHoursData);

  }, [productivityData]);


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
        window.localStorage.setItem('dailySummary', JSON.stringify(newDailySummary));
        window.localStorage.setItem('hourlyBacklog', JSON.stringify(hourlyBacklog));
        window.localStorage.setItem('performanceData', JSON.stringify(performanceData));
        window.localStorage.setItem('productivityData', JSON.stringify(productivityData));
        window.localStorage.setItem('productivityDate', JSON.stringify(productivityDate));
        window.localStorage.setItem('rowsPerPage', JSON.stringify(rowsPerPage));
        window.localStorage.setItem('productivityHoursData', JSON.stringify(productivityHoursData));


      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, totalPacked, metrics, dailySummary, hourlyBacklog, performanceData, productivityData, productivityDate, rowsPerPage, productivityHoursData]);

  const handleMetricsUpdate = (data: { forecast: number }) => {
    setMetrics((prevMetrics) => {
        const newMetrics = { ...prevMetrics, forecast: data.forecast, actual: totalPacked };
        newMetrics.fulfillmentRate = data.forecast > 0 ? (dailySummary.day1.actual / data.forecast) * 100 : 0;
        return newMetrics;
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
                let targetOrder = 0;
                if(newItem.job === 'Picker') {
                  targetOrder = 420;
                } else if (newItem.job === 'Packer') {
                  targetOrder = 385;
                }
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
          if (uploadedData.length === 0) return;
  
          const jobType = uploadedData[0].job;
          if (jobType !== 'Picker' && jobType !== 'Packer') {
            console.error("Invalid job type in CSV. Must be 'Picker' or 'Packer'.");
            return;
          }
  
          setProductivityData(prevData => {
            const currentPerformance = prevData.performance;

            const newItemsFromCSV = uploadedData.map(row => {
              const id = parseInt(row.id);
              if (isNaN(id) || row.job !== jobType) return null;
    
              const totalOrder = parseInt(row.totalOrder) || 0;
              const totalQty = parseInt(row.totalQty) || 0;
              
              let targetOrder = 0;
              let targetQuantity = 0;
    
              if (jobType === 'Picker') {
                targetOrder = 420;
                targetQuantity = 1085;
              } else if (jobType === 'Packer') {
                targetOrder = 385;
                targetQuantity = 975;
              }
    
              const status = totalOrder >= targetOrder ? 'BERHASIL' : 'GAGAL';
    
              return {
                id,
                name: row.name || '',
                job: jobType,
                totalOrder,
                totalQty,
                targetOrder,
                targetQuantity,
                status
              }
            }).filter(Boolean) as PerformanceItem[];

            const existingItemsForJob = currentPerformance.filter(p => p.job === jobType);
            const otherJobItems = currentPerformance.filter(p => p.job !== jobType);

            const updatedItemsForJob = existingItemsForJob.map(existingItem => {
              const newItem = newItemsFromCSV.find(up => up.id === existingItem.id);
              return newItem || existingItem;
            });
            
            const newPerformance = [...otherJobItems, ...updatedItemsForJob].sort((a,b) => a.id - b.id);
            
            return { performance: newPerformance };
          });
        },
        error: (error: any) => {
          console.error("Error parsing CSV:", error);
        }
      });
    }
    if (event.target) {
        event.target.value = '';
    }
  };
  
  const handleProductivityReset = () => {
    setProductivityData(initialProductivityData);
    setCurrentPage(1);
  };

  const handleProductivityDelete = (id: number) => {
    setProductivityData(prevData => {
      const newPerformance = prevData.performance.map(item => {
        if (item.id === id) {
          const initialItem = initialProductivityData.performance.find(p => p.id === id);
          return initialItem ? { ...initialItem, name: "" } : item;
        }
        return item;
      });
      return { ...prevData, performance: newPerformance };
    });
  };
  

  const handleProductivityDeleteAll = () => {
    setProductivityData({ performance: [] });
    setCurrentPage(1);
  };

  const value = {
    metrics: { ...metrics, totalPacked },
    dailySummary,
    hourlyBacklog,
    performanceData: { ...performanceData, totalPacked, averageHoursPacked },
    productivityData: productivityData,
    productivityHoursData,
    isClient,
    isDialogOpen,
    setIsDialogOpen,
    isProductivityFormOpen,
    setIsProductivityFormOpen,
    editingPerformance,
    setEditingPerformance,
    handleMetricsUpdate,
    handleHourlyBacklogUpdate,
    handlePerformanceUpdate,
    handleProductivityUpdate,
    handleFileUpload,
    handleProductivityReset,
    handleProductivityDelete,
    handleProductivityDeleteAll,
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
