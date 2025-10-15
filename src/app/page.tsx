'use client';

import { useState } from 'react';
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
type ChartData = typeof initialChartData;

export default function Home() {
  const [keyMetrics, setKeyMetrics] = useState(initialKeyMetrics);
  const [orderStatusBacklog, setOrderStatusBacklog] = useState(initialOrderStatusBacklog);
  const [dailyBreakdown, setDailyBreakdown] = useState(initialDailyBreakdown);
  const [chartData, setChartData] = useState(initialChartData);

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
