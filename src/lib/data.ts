export const keyMetrics = {
  details: [
    {
      id: "forecast",
      title: "Forecast",
      value: "5,430",
    },
    {
      id: "actualPacked",
      title: "Actual Packed",
      value: "3,890",
      trend: "up" as const,
      trendLabel: "+12.5% from yesterday",
    },
    {
      id: "oosOrders",
      title: "OOS Orders",
      value: "124",
      trend: "down" as const,
      trendLabel: "-3.1% from yesterday",
    },
    {
      id: "fulfillmentRate",
      title: "Fulfillment Rate",
      value: "96.9%",
      trend: "up" as const,
      trendLabel: "+0.5% from yesterday",
    },
    {
      id: "actualOOS",
      title: "Actual OOS %",
      value: "3.1%",
      trend: "down" as const,
      trendLabel: "-0.2% from yesterday",
    },
  ],
  progress: 71,
};

export const orderStatusBacklog = [
  {
    status: "Payment Accepted",
    orderCount: 1250,
    itemCount: 3750,
    avgItemsPerOrder: 3.0,
  },
  {
    status: "In Progress",
    orderCount: 850,
    itemCount: 2125,
    avgItemsPerOrder: 2.5,
  },
  {
    status: "Picked",
    orderCount: 430,
    itemCount: 1505,
    avgItemsPerOrder: 3.5,
  },
  {
    status: "Packed",
    orderCount: 3890,
    itemCount: 10114,
    avgItemsPerOrder: 2.6,
  },
];

export const dailyBreakdown = [
  {
    day: "Today",
    actualPacked: 3890,
    totalPacked: 5430,
    fulfillmentPercentage: 71.64,
  },
  {
    day: "Yesterday",
    actualPacked: 3458,
    totalPacked: 5100,
    fulfillmentPercentage: 67.8,
  },
  {
    day: "2 days ago",
    actualPacked: 4120,
    totalPacked: 5250,
    fulfillmentPercentage: 78.48,
  },
];

export const chartData = {
  orderStatus: [
    { status: "Payment", count: 1250 },
    { status: "Progress", count: 850 },
    { status: "Picked", count: 430 },
    { status: "Packed", count: 3890 },
  ],
  dailyProgress: [
    { day: "Mon", forecast: 4000, actual: 2400 },
    { day: "Tue", forecast: 4200, actual: 3398 },
    { day: "Wed", forecast: 4500, actual: 4800 },
    { day: "Thu", forecast: 4300, actual: 3908 },
    { day: "Fri", forecast: 4800, actual: 4300 },
    { day: "Sat", forecast: 5200, actual: 4800 },
    { day: "Sun", forecast: 5430, actual: 3890 },
  ],
};
