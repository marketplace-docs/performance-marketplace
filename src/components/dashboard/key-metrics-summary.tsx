import {
  BarChart,
  CheckCircle,
  Package,
  Clock,
  TrendingUp,
  XCircle,
} from "lucide-react";
import KeyMetricCard from "./key-metrics-card";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Metric = {
  id: string;
  title: string;
  value: string;
  trend?: "up" | "down" | "neutral";
  trendLabel?: string;
};

type KeyMetricsSummaryProps = {
  metrics: {
    details: Metric[];
    progress: number;
  };
};

const icons: Record<string, React.ReactNode> = {
  forecast: <BarChart className="h-4 w-4" />,
  actualPacked: <Package className="h-4 w-4" />,
  oosOrders: <XCircle className="h-4 w-4" />,
  fulfillmentRate: <CheckCircle className="h-4 w-4" />,
  actualOOS: <TrendingUp className="h-4 w-4" />,
};

export default function KeyMetricsSummary({ metrics }: KeyMetricsSummaryProps) {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {metrics.details.map((metric) => (
          <KeyMetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendLabel={metric.trendLabel}
            icon={icons[metric.id]}
          />
        ))}
      </div>
      <Card className="mt-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-medium">
            Daily Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Progress value={metrics.progress} aria-label={`${metrics.progress}% complete`} />
            <span className="font-bold text-primary">{metrics.progress}%</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
