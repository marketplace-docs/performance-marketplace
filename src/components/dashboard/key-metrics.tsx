type KeyMetricsProps = {
  metrics: {
    forecast: number;
    actual: number;
    oos: number;
    actualOOS: number;
    fulfillmentRate: number;
    progress: number;
    actualVsForecast: number;
    oosVsForecast: number;
    actualOOSVsForecast: number;
  };
};

const MetricItem = ({ label, value, isPercentage = false }: { label: string; value: string | number, isPercentage?: boolean }) => {
  const displayValue = value ?? 0;
  return (
    <>
      <div className="border-r border-b px-2 py-1 font-medium">{label}</div>
      <div className="border-r border-b px-2 py-1 text-right">{typeof displayValue === 'number' && isPercentage ? `${displayValue.toFixed(2)}%` : displayValue.toLocaleString()}</div>
    </>
  );
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr_auto_1fr] border-t border-l">
      <MetricItem label="Forecast" value={metrics.forecast} />
      <MetricItem label="Actual" value={metrics.actual} />
      <MetricItem label="OOS" value={metrics.oos} />
      <MetricItem label="Actual OOS" value={metrics.actualOOS} />
      
      <MetricItem label="Fulfillment Rate" value={`${metrics.fulfillmentRate.toFixed(2)}%`} />
      <MetricItem label="Progress" value={metrics.progress} />
      <div className="border-r border-b px-2 py-1"></div>
      <div className="border-r border-b px-2 py-1"></div>

      <MetricItem label="Actual vs Forecast" value={metrics.actualVsForecast} isPercentage />
      <MetricItem label="OOS vs Forecast" value={metrics.oosVsForecast} isPercentage />
      <MetricItem label="Actual OOS vs Forecast" value={metrics.actualOOSVsForecast} isPercentage />
      <div className="border-r border-b px-2 py-1"></div>
    </div>
  );
}
