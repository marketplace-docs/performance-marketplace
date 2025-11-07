import PerformanceSummary from "./performance-summary";

type KeyMetricsProps = {
  metrics: {
    forecast: number;
    actual: number;
    fulfillmentRate: number;
    totalPacked: number;
  };
};

const MetricItem = ({ label, value, isPercentage = false }: { label: string; value: string | number, isPercentage?: boolean }) => {
  const displayValue = value ?? 0;
  
  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      return isPercentage ? `${val.toFixed(2)}%` : val.toLocaleString();
    }
    return val;
  }

  return (
    <>
      <div className="border-r border-b px-2 py-1 font-medium">{label}</div>
      <div className="border-r border-b px-2 py-1 text-right">{formatValue(displayValue)}</div>
    </>
  );
}

export default function KeyMetrics({ metrics }: KeyMetricsProps) {
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_auto_1fr_auto_1fr] border-t border-l">
        <MetricItem label="Forecast" value={metrics.forecast.toLocaleString()} />
        <MetricItem label="Actual Order" value={metrics.actual.toLocaleString()} />
        <MetricItem label="Fulfillment Rate" value={metrics.fulfillmentRate} isPercentage />
      </div>
      <PerformanceSummary data={{ totalPacked: metrics.totalPacked }} />
    </div>
  );
}
