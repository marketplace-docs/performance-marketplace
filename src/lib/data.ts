export const initialMetrics = {
  forecast: 0,
  actual: 0,
  oos: 0,
  actualOOS: 0,
  fulfillmentRate: 0,
  progress: 0,
  actualVsForecast: 0,
  oosVsForecast: 0,
  actualOOSVsForecast: 0,
};

export const initialBacklogData = {
  date: "ORDERS STATUS FRIDAY",
  types: [
    {
      name: "Marketplace",
      statuses: {
        paymentAccepted: { order: 298, item: 403, avg: 1.4 },
        inProgress: { order: 296, item: 399, avg: 1.3 },
        picked: { order: 206, item: 242, avg: 1.2 },
        packed: { order: 28, item: 38, avg: 1.4 },
      },
    },
  ],
};

export const initialDailySummary = {
  day1: { day: 1, actual: 0, total: 0 },
  day2: { day: 2, actual: 0, total: 0 },
};

// Deprecated data, will be removed in future versions
export const keyMetrics = { details: [], progress: 0 };
export const orderStatusBacklog = [];
export const dailyBreakdown = [];
export const chartData = { orderStatus: [], dailyProgress: [] };
