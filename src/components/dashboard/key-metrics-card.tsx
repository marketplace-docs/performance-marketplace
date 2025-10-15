import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

type Trend = "up" | "down" | "neutral";

type KeyMetricCardProps = {
  title: string;
  value: string;
  trend?: Trend;
  trendLabel?: string;
  icon: ReactNode;
};

const trendIcons: Record<Trend, ReactNode> = {
  up: <ArrowUp className="h-4 w-4 text-green-500" />,
  down: <ArrowDown className="h-4 w-4 text-red-500" />,
  neutral: <Minus className="h-4 w-4 text-muted-foreground" />,
};

const trendColorClasses: Record<Trend, string> = {
    up: "text-green-500",
    down: "text-red-500",
    neutral: "text-muted-foreground"
}

export default function KeyMetricCard({
  title,
  value,
  trend,
  trendLabel,
  icon,
}: KeyMetricCardProps) {
  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="text-muted-foreground">{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && trendLabel && (
          <div className="flex items-center text-xs text-muted-foreground">
             {trendIcons[trend]}
            <p className={cn("ml-1", trendColorClasses[trend])}>{trendLabel}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
