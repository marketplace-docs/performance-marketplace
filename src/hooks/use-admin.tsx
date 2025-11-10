'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { initialMetrics, initialDailySummary, initialHourlyBacklog, initialProductivityData, initialProductivityHoursData, initialOrderStatusData } from '@/lib/data';
import Papa from 'papaparse';
import { format, differenceInCalendarDays, parse } from 'date-fns';

type Metrics = typeof initialMetrics;
type DailySummaryData = typeof initialDailySummary;
type HourlyBacklogData = typeof initialHourlyBacklog;
type ProductivityData = typeof initialProductivityData;
type PerformanceItem = ProductivityData['performance'][0];
type ProductivityHoursData = typeof initialProductivityHoursData;
type OrderStatusData = typeof initialOrderStatusData;


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
  productivityData: ProductivityData;
  productivityHoursData: ProductivityHoursData;
  orderStatusData: OrderStatusData;
  isClient: boolean;
  isDialogOpen: boolean;
  setIsDialogOpen: (isOpen: boolean) => void;
  isProductivityFormOpen: boolean;
  setIsProductivityFormOpen: (isOpen: boolean) => void;
  editingPerformance: PerformanceItem | null;
  setEditingPerformance: (item: PerformanceItem | null) => void;
  handleMetricsUpdate: (data: { forecast: number }) => void;
  handleHourlyBacklogUpdate: (data: { hourlyData: { hour: string; value: number }[] }) => void;
  handleProductivityUpdate: (data: PerformanceItem) => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleProductivityReset: () => void;
  handleProductivityDelete: (id: number) => void;
  handleProductivityDeleteAll: () => void;
  handleOrderStatusUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOrderStatusTemplateExport: () => void;
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
  const [productivityData, setProductivityData] = useState<ProductivityData>(() => getFromLocalStorage('productivityData', initialProductivityData));
  const [productivityHoursData, setProductivityHoursData] = useState<ProductivityHoursData>(() => getFromLocalStorage('productivityHoursData', initialProductivityHoursData));
  const [orderStatusData, setOrderStatusData] = useState<OrderStatusData>(() => getFromLocalStorage('orderStatusData', initialOrderStatusData));

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

  const totalPacked = useMemo(() => {
    return hourlyBacklog.reduce((sum, item) => sum + item.value, 0);
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
    const pickerTargetEndShiftOrder = pickerTargetOrder * workingHours;
    
    newHoursData.picker = {
        jumlah: pickerCount,
        totalOrder: pickerTotalOrder,
        totalQuantity: pickerTotalQty,
        averageOrderHours: pickerCount > 0 ? Math.round(pickerTotalOrder / pickerCount) : 0,
        averageQuantityHours: pickerCount > 0 ? Math.round(pickerTotalQty / pickerCount) : 0,
        targetOrder: pickerTargetOrder,
        targetQuantity: pickerTargetQty,
        targetEndShiftOrder: pickerTargetEndShiftOrder,
        targetEndShiftQuantity: pickerTargetQty * workingHours,
        status: pickerTotalOrder >= pickerTargetEndShiftOrder ? 'BERHASIL' : 'GAGAL',
        progress: pickerTargetEndShiftOrder > 0 ? (pickerTotalOrder / pickerTargetEndShiftOrder) * 100 : 0,
    };
    
    const packerCount = packers.filter(p => p.name).length;
    const packerTotalOrder = packers.reduce((sum, p) => sum + p.totalOrder, 0);
    const packerTotalQty = packers.reduce((sum, p) => sum + p.totalQty, 0);
    const packerTargetOrder = 725;
    const packerTargetQty = 975;
    const packerTargetEndShiftOrder = packerTargetOrder * workingHours;

    newHoursData.packer = {
      jumlah: packerCount,
      totalOrder: packerTotalOrder,
      totalQuantity: packerTotalQty,
      averageOrderHours: packerCount > 0 ? Math.round(packerTotalOrder / packerCount) : 0,
      averageQuantityHours: packerCount > 0 ? Math.round(packerTotalQty / packerCount) : 0,
      targetOrder: packerTargetOrder,
      targetQuantity: packerTargetQty,
      targetEndShiftOrder: packerTargetEndShiftOrder,
      targetEndShiftQuantity: packerTargetQty * workingHours,
      status: packerTotalOrder >= packerTargetEndShiftOrder ? 'BERHASIL' : 'GAGAL',
      progress: packerTargetEndShiftOrder > 0 ? (packerTotalOrder / packerTargetEndShiftOrder) * 100 : 0,
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
        
        const existingPackedOrder = orderStatusData.types[0].statuses.packed.order;
        if (totalPacked !== existingPackedOrder && totalPacked > 0) {
          const newOrderStatusData = {
            ...orderStatusData,
            types: orderStatusData.types.map(type => ({
              ...type,
              statuses: {
                ...type.statuses,
                packed: {
                  ...type.statuses.packed,
                  order: totalPacked,
                  item: totalPacked, 
                }
              }
            }))
          };
          setOrderStatusData(newOrderStatusData);
        }

        if (JSON.stringify(newMetrics) !== JSON.stringify(getFromLocalStorage('metrics', initialMetrics))) {
            setMetrics(newMetrics);
        }
        if (JSON.stringify(newDailySummary) !== JSON.stringify(getFromLocalStorage('dailySummary', initialDailySummary))) {
            setDailySummary(newDailySummary);
        }

        window.localStorage.setItem('metrics', JSON.stringify(newMetrics));
        window.localStorage.setItem('dailySummary', JSON.stringify(newDailySummary));
        window.localStorage.setItem('hourlyBacklog', JSON.stringify(hourlyBacklog));
        window.localStorage.setItem('productivityData', JSON.stringify(productivityData));
        window.localStorage.setItem('productivityDate', JSON.stringify(productivityDate));
        window.localStorage.setItem('rowsPerPage', JSON.stringify(rowsPerPage));
        window.localStorage.setItem('productivityHoursData', JSON.stringify(productivityHoursData));
        window.localStorage.setItem('orderStatusData', JSON.stringify(orderStatusData));

      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, totalPacked, metrics, dailySummary, hourlyBacklog, productivityData, productivityDate, rowsPerPage, productivityHoursData, orderStatusData]);

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

  const handleProductivityUpdate = (updatedItem: PerformanceItem) => {
    setProductivityData(prevData => {
        const newPerformance = prevData.performance.map(item => {
            if (item.id === updatedItem.id) {
                const newItem = { ...item, ...updatedItem };
                newItem.status = newItem.totalOrder >= newItem.targetOrder ? 'BERHASIL' : 'GAGAL';
                newItem.progress = newItem.targetOrder > 0 ? (newItem.totalOrder / newItem.targetOrder) * 100 : 0;
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
  
          setProductivityData(prevData => {
            const jobType = uploadedData.length > 0 ? uploadedData[0].job : null;
            if (!jobType || (jobType !== 'Picker' && jobType !== 'Packer')) {
              console.error("Invalid or missing job type in CSV. Must be 'Picker' or 'Packer'.");
              return prevData;
            }

            const updatedPerformance = [...prevData.performance];
            const uploadedMap = new Map(uploadedData.map(row => [parseInt(row.id), row]));

            uploadedMap.forEach((csvRow, id) => {
              const index = updatedPerformance.findIndex(p => p.id === id);
              if (index !== -1 && updatedPerformance[index].job === jobType) {
                  const templateItem = initialProductivityData.performance.find(p => p.id === id);
                  const totalOrder = parseInt(csvRow.totalOrder) || 0;
                  const totalQty = parseInt(csvRow.totalQty) || 0;
                  const targetOrder = templateItem?.targetOrder || 0;
                  const status = totalOrder >= targetOrder ? 'BERHASIL' : 'GAGAL';
                  const progress = targetOrder > 0 ? (totalOrder / targetOrder) * 100 : 0;

                  updatedPerformance[index] = {
                      ...updatedPerformance[index],
                      name: csvRow.name || '',
                      totalOrder,
                      totalQty,
                      status,
                      progress,
                  };
              }
            });

            return { performance: updatedPerformance };
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
  
  const handleOrderStatusUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const uploadedData = results.data as any[];
          if (uploadedData.length === 0) return;
  
          // Reset the data to a clean slate before processing
          const newCalculatedData = JSON.parse(JSON.stringify(initialOrderStatusData));
  
          const statusMapping: { [key: string]: keyof typeof newCalculatedData.types[0]['statuses'] | null } = {
            'payment_accepted': 'paymentAccepted',
            'wavetask_assign': 'inProgress',
            'wavetask_progress': 'inProgress',
            'wavetask_done': 'picked',
            'wavetask_validated': 'packed',
            'wavetask_shipped': 'shipped',
          };
  
          uploadedData.forEach(row => {
            const rawStatus = row.status?.toLowerCase();
            const mappedStatus = statusMapping[rawStatus];
            
            if (mappedStatus) {
              const targetStatus = newCalculatedData.types[0].statuses[mappedStatus];
              const total_quant = parseInt(row.total_quant) || 0;
  
              targetStatus.order += 1;
              targetStatus.item += total_quant;
  
              // Calculate H+ logic
              const paymentDate = parse(row.payment_date, 'MM/dd/yyyy HH:mm', new Date());
              if (!isNaN(paymentDate.getTime())) {
                const today = new Date();
                const daysDiff = differenceInCalendarDays(today, paymentDate);
                
                if (daysDiff >= 3) {
                  targetStatus.hPlus3 += 1;
                }
                if (daysDiff >= 2) {
                  targetStatus.hPlus2 += 1;
                }
                if (daysDiff >= 1) {
                  targetStatus.hPlus1 += 1;
                }
              }
            }
          });
  
          // Calculate AVG
          newCalculatedData.types.forEach((type: any) => {
            Object.keys(type.statuses).forEach(statusKey => {
              const status = type.statuses[statusKey as keyof typeof type.statuses];
              if (status.order > 0) {
                status.avg = status.item / status.order;
              }
            });
          });
          
          setOrderStatusData(newCalculatedData);
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

  const handleOrderStatusTemplateExport = () => {
    const rows = [
      {
        reference: "ORDER_REF_1",
        status: "wavetask_shipped",
        payment_date: format(new Date(), "MM/dd/yyyy HH:mm"),
        order_type: "COSRX Official Store",
        order_source: "Shopee COSRX",
        total_sku: 1,
        total_quant: 1,
      },
       {
        reference: "ORDER_REF_2",
        status: "wavetask_validated",
        payment_date: format(new Date(), "MM/dd/yyyy HH:mm"),
        order_type: "Derma Angel Official Store",
        order_source: "Shopee Derma Angel",
        total_sku: 2,
        total_quant: 3,
      },
      {
        reference: "ORDER_REF_3",
        status: "wavetask_done",
        payment_date: format(new Date(), "MM/dd/yyyy HH:mm"),
        order_type: "Some Other Store",
        order_source: "Tiktok",
        total_sku: 1,
        total_quant: 1,
      }
    ];

    const csv = Papa.unparse(rows);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "raw_order_status_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const value = {
    metrics: { ...metrics, actual: totalPacked },
    dailySummary,
    hourlyBacklog,
    productivityData: productivityData,
    productivityHoursData,
    orderStatusData,
    isClient,
    isDialogOpen,
    setIsDialogOpen,
    isProductivityFormOpen,
    setIsProductivityFormOpen,
    editingPerformance,
    setEditingPerformance,
    handleMetricsUpdate,
    handleHourlyBacklogUpdate,
    handleProductivityUpdate,
    handleFileUpload,
    handleProductivityReset,
    handleProductivityDelete,
    handleProductivityDeleteAll,
    handleOrderStatusUpload,
    handleOrderStatusTemplateExport,
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
