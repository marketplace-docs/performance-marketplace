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

export const initialProductivityData = {
  date: "6 NOVEMBER 2025",
  performance: [
    { id: 1, name: "Edi Saputro", job: "Picker", totalOrder: 245, totalQty: 324, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 2, name: "Putri Aninda Febriani", job: "Picker", totalOrder: 225, totalQty: 264, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 3, name: "Panji Ridwan", job: "Picker", totalOrder: 174, totalQty: 213, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 4, name: "Luthfi Aditya", job: "Picker", totalOrder: 159, totalQty: 235, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
    { id: 5, name: "Omar", job: "Picker", totalOrder: 0, totalQty: 0, targetOrder: 420, targetQuantity: 1085, status: "GAGAL" },
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


// Deprecated data, will be removed in future versions
export const keyMetrics = { details: [], progress: 0 };
export const orderStatusBacklog = [];
export const dailyBreakdown = [];
export const chartData = { orderStatus: [], dailyProgress: [] };
