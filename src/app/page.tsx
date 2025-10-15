'use client';

import { useState, useEffect } from 'react';
import Header from "@/components/header";
import KeyMetricsSummary from "@/components/dashboard/key-metrics-summary";
import OrderStatusBacklog from "@/components/dashboard/order-status-backlog";
import DailyBreakdown from "@/components/dashboard/daily-breakdown";
import FulfillmentCharts from "@/components/dashboard/fulfillment-charts";
import AdminForm from "@/components/dashboard/admin-form";
import {
  keyMetrics as initialKeyMetrics,
  orderStatusBacklog as initialOrderStatusBacklog,
  dailyBreakdown as initialDailyBreakdown,
  chartData as initialChartData,
} from "@/lib/data";

type KeyMetrics = typeof initialKeyMetrics;
type OrderStatusBacklog = typeof initialOrderStatusBacklog;
type DailyBreakdown = typeof initialDailyBreakdown;
type ChartData = typeof initialChartData;

// Helper function to get data from localStorage
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
  const [keyMetrics, setKeyMetrics] = useState<KeyMetrics>(initialKeyMetrics);
  const [orderStatusBacklog, setOrderStatusBacklog] = useState<OrderStatusBacklog>(initialOrderStatusBacklog);
  const [dailyBreakdown, setDailyBreakdown] = useState<DailyBreakdown>(initialDailyBreakdown);
  const [chartData, setChartData] = useState<ChartData>(initialChartData);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setKeyMetrics(getFromLocalStorage("keyMetrics", initialKeyMetrics));
    setOrderStatusBacklog(getFromLocalStorage("orderStatusBacklog", initialOrderStatusBacklog));
    setDailyBreakdown(getFromLocalStorage("dailyBreakdown", initialDailyBreakdown));
    setChartData(getFromLocalStorage("chartData", initialChartData));
    setIsClient(true);
  }, []);

  // Effect to save state to localStorage whenever it changes
  useEffect(() => {
    if (isClient) {
      try {
        window.localStorage.setItem("keyMetrics", JSON.stringify(keyMetrics));
        window.localStorage.setItem("orderStatusBacklog", JSON.stringify(orderStatusBacklog));
        window.localStorage.setItem("dailyBreakdown", JSON.stringify(dailyBreakdown));
        window.localStorage.setItem("chartData", JSON.stringify(chartData));
      } catch (error) {
        console.warn('Error writing to localStorage:', error);
      }
    }
  }, [isClient, keyMetrics, orderStatusBacklog, dailyBreakdown, chartData]);


  const handleDataUpdate = (newForecast: number, newOos: number) => {
    setKeyMetrics((prevMetrics) => {
      const newDetails = prevMetrics.details.map((metric) => {
        if (metric.id === "forecast") {
          return { ...metric, value: newForecast.toLocaleString() };
        }
        if (metric.id === "oosOrders") {
          return { ...metric, value: newOos.toLocaleString() };
        }
        return metric;
      });
      return { ...prevMetrics, details: newDetails };
    });
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      <Header />
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <KeyMetricsSummary metrics={keyMetrics} />
        <div className="grid gap-4 md:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 grid auto-rows-max items-start gap-4 md:gap-8">
            <OrderStatusBacklog data={orderStatusBacklog} />
            <DailyBreakdown data={dailyBreakdown} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 md:gap-8">
            <FulfillmentCharts
              barChartData={chartData.orderStatus}
              lineChartData={chartData.dailyProgress}
            />
            <AdminForm onDataSubmit={handleDataUpdate} />
          </div>
        </div>
      </main>
    </div>
  );
}
