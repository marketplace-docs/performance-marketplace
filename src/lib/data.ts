export const initialMetrics = {
  forecast: 0,
  actual: 0,
  fulfillmentRate: 0,
};

export const initialOrderStatusData = {
  types: [
    {
      name: "Marketplace",
      statuses: {
        paymentAccepted: { order: 0, item: 0, avg: 0, hPlus1: 0, hPlus2: 0, hPlus3: 0 },
        inProgress: { order: 0, item: 0, avg: 0, hPlus1: 0, hPlus2: 0, hPlus3: 0 },
        picked: { order: 0, item: 0, avg: 0, hPlus1: 0, hPlus2: 0, hPlus3: 0 },
        packed: { order: 0, item: 0, avg: 0, hPlus1: 0, hPlus2: 0, hPlus3: 0 },
        shipped: { order: 0, item: 0, avg: 0, hPlus1: 0, hPlus2: 0, hPlus3: 0 },
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
  { hour: '01:00', value: 0 },
  { hour: '02:00', value: 0 },
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
  picker: 0,
  packer: 0,
};

const generatePerformanceData = () => {
  const performance = [];
  // 100 Pickers
  for (let i = 1; i <= 100; i++) {
    performance.push({
      id: i,
      name: "",
      job: "Picker",
      totalOrder: 0,
      totalQty: 0,
      targetOrder: 7500,
      targetQuantity: 10850,
      status: "GAGAL",
      progress: 0,
    });
  }
  // 100 Packers
  for (let i = 1; i <= 100; i++) {
    performance.push({
      id: i + 100,
      name: "",
      job: "Packer",
      totalOrder: 0,
      totalQty: 0,
      targetOrder: 7250,
      targetQuantity: 9750,
      status: "GAGAL",
      progress: 0,
    });
  }
  return performance;
};

export const initialProductivityData = {
  performance: generatePerformanceData()
};

export const initialProductivityHoursData = {
  picker: {
    jumlah: 0,
    totalOrder: 0,
    totalQuantity: 0,
    averageOrderHours: 0,
    averageQuantityHours: 0,
    targetOrder: 750,
    targetQuantity: 1085,
    targetEndShiftOrder: 0,
    targetEndShiftQuantity: 0,
    status: 'GAGAL',
    progress: 0,
  },
  packer: {
    jumlah: 0,
    totalOrder: 0,
    totalQuantity: 0,
    averageOrderHours: 0,
    averageQuantityHours: 0,
    targetOrder: 725,
    targetQuantity: 975,
    targetEndShiftOrder: 0,
    targetEndShiftQuantity: 0,
    status: 'GAGAL',
    progress: 0,
  },
};


// Deprecated data, will be removed in future versions
export const initialBacklogData = {
  types: [
    {
      name: "Marketplace",
      statuses: {
        paymentAccepted: { order: 0, item: 0, avg: 0 },
        inProgress: { order: 0, item: 0, avg: 0 },
        picked: { order: 0, item: 0, avg: 0 },
        packed: { order: 0, item: 0, avg: 0 },
      },
    },
  ],
};
export const keyMetrics = { details: [], progress: 0 };
export const orderStatusBacklog = [];
export const dailyBreakdown = [];
export const chartData = { orderStatus: [], dailyProgress: [] };
