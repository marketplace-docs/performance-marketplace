
export const keyMetrics = {
  details: [
    {
      id: "forecast",
      title: "Forecast",
      value: "0",
    },
    {
      id: "actualPacked",
      title: "Actual Packed",
      value: "0",
      trend: "neutral" as const,
      trendLabel: "",
    },
    {
      id: "oosOrders",
      title: "OOS Orders",
      value: "0",
      trend: "neutral" as const,
      trendLabel: "",
    },
    {
      id: "fulfillmentRate",
      title: "Fulfillment Rate",
      value: "0%",
      trend: "neutral" as const,
      trendLabel: "",
    },
    {
      id: "actualOOS",
      title: "Actual OOS %",
      value: "0%",
      trend: "neutral" as const,
      trendLabel: "",
    },
  ],
  progress: 0,
};

export const orderStatusBacklog = [
  {
    status: "Payment Accepted",
    orderCount: 0,
    itemCount: 0,
    avgItemsPerOrder: 0,
  },
  {
    status: "In Progress",
    orderCount: 0,
    itemCount: 0,
    avgItemsPerOrder: 0,
  },
  {
    status: "Picked",
    orderCount: 0,
    itemCount: 0,
    avgItemsPerOrder: 0,
  },
  {
    status: "Packed",
    orderCount: 0,
    itemCount: 0,
    avgItemsPerOrder: 0,
  },
];

export const dailyBreakdown = [
  {
    day: "Today",
    actualPacked: 0,
    totalPacked: 0,
    fulfillmentPercentage: 0,
  },
];

export const chartData = {
  orderStatus: [
    { status: "Payment", count: 0 },
    { status: "Progress", count: 0 },
    { status: "Picked", count: 0 },
    { status: "Packed", count: 0 },
  ],
  dailyProgress: [
    { day: "Mon", forecast: 0, actual: 0 },
    { day: "Tue", forecast: 0, actual: 0 },
    { day: "Wed", forecast: 0, actual: 0 },
    { day: "Thu", forecast: 0, actual: 0 },
    { day: "Fri", forecast: 0, actual: 0 },
    { day: "Sat", forecast: 0, actual: 0 },
    { day: "Sun", forecast: 0, actual: 0 },
  ],
};
