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
        paymentAccepted: { order: 0, item: 0, avg: 0 },
        inProgress: { order: 0, item: 0, avg: 0 },
        picked: { order: 0, item: 0, avg: 0 },
        packed: { order: 0, item: 0, avg: 0 },
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

export const initialProductivityData = {
  performance: [
    { id: 1, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 2, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 3, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 4, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 5, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 6, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 7, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 8, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 9, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 10, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 11, name: "", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 12, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 13, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 14, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 15, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 16, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 17, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 18, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 19, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 20, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 21, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 22, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 23, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 24, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
    { id: 25, name: "", job: "Packer", totalOrder: 0, totalQty: 0, targetOrder: 385, targetQuantity: 1050, status: "GAGAL" },
  ]
};

export const initialProductivityHoursData = {
  picker: {
    jumlah: 0,
    totalOrder: 0,
    totalQuantity: 0,
    byHours: 0,
    targetOrder: 0,
    targetQuantity: 0,
    status: 'GAGAL',
  },
  packer: {
    jumlah: 0,
    totalOrder: 0,
    totalQuantity: 0,
    byHours: 0,
    targetOrder: 0,
    targetQuantity: 0,
    status: 'GAGAL',
  },
};


// Deprecated data, will be removed in future versions
export const keyMetrics = { details: [], progress: 0 };
export const orderStatusBacklog = [];
export const dailyBreakdown = [];
export const chartData = { orderStatus: [], dailyProgress: [] };
