export const initialMetrics = {
  forecast: 0,
  actual: 0,
  fulfillmentRate: 0,
};

export const initialBacklogData = {
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

export const initialHourlyBacklog = [
  { hour: '00:00', value: 0 },
  { hour: '01:00', value: 300 },
  { hour: '02:00', value: 500 },
  { hour: '03:00', value: 0 },
  { hour: '04:00', value: 0 },
  { hour: '05:00', value: 0 },
  { hour: '06:00', value: 0 },
  { hour: '07:00', value: 0 },
  { hour: '08:00', value: 0 },
  { hour: '09:00', value: 0 },
  { hour: '10:00', value: 0 },
  { hour: '11:00', value: 0 },
  { hour: '12:00', value: 0 },
  { hour: '13:00', value: 0 },
  { hour: '14:00', value: 0 },
  { hour: '15:00', value: 0 },
  { hour: '16:00', value: 0 },
  { hour: '17:00', value: 0 },
  { hour: '18:00', value: 0 },
  { hour: '19:00', value: 0 },
  { hour: '20:00', value: 0 },
  { hour: '21:00', value: 0 },
  { hour: '22:00', value: 0 },
  { hour: '23:00', value: 0 },
];

export const initialPerformanceData = {
  picker: 206,
  packer: 28,
};


// Deprecated data, will be removed in future versions
export const keyMetrics = { details: [], progress: 0 };
export const orderStatusBacklog = [];
export const dailyBreakdown = [];
export const chartData = { orderStatus: [], dailyProgress: [] };
