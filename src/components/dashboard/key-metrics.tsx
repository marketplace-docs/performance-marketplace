type KeyMetricsProps = {
  metrics: {
    forecast: number;
    actual: number;
    oos: number;
    actualOOS: number;
    fulfillmentRate: number;
    progress: number;
  };
};

const MetricItem = ({ label, value }: { label: string; value: string | number }) => (
  <>
    <div className="border-r border-b px-2 py-1 font-medium">{label}</div>
    <div className="border-r border-b px-2 py-1 text-right">{value.toLocaleString()}</div>
  </>
);

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-[auto_100px_auto_100px_auto_100px_auto_100px] border-t border-l">
      <MetricItem label="Forecast" value={metrics.forecast} />
      <MetricItem label="Actual" value={metrics.actual} />
      <MetricItem label="OOS" value={metrics.oos} />
      <MetricItem label="Actual OOS" value={metrics.actualOOS} />
      
      <MetricItem label="Fulfillment Rate" value={`${metrics.fulfillmentRate}%`} />
      <MetricItem label="Progress" value={metrics.progress} />
      <div className="border-r border-b px-2 py-1"></div>
      <div className="border-r border-b px-2 py-1"></div>
    </div>
  );
}
