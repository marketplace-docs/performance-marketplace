"use client";

import { Bar, BarChart, Line, LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

type FulfillmentChartsProps = {
  barChartData: any[];
  lineChartData: any[];
};

const barChartConfig = {
  count: {
    label: "Orders",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const lineChartConfig = {
  forecast: {
    label: "Forecast",
    color: "hsl(var(--primary))",
  },
  actual: {
    label: "Actual",
    color: "hsl(var(--accent))",
  },
} satisfies ChartConfig;

export default function FulfillmentCharts({
  barChartData,
  lineChartData,
}: FulfillmentChartsProps) {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Orders per Status</CardTitle>
          <CardDescription>Distribution of orders across statuses.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={barChartConfig} className="h-[250px] w-full">
            <BarChart data={barChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="status" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="count" fill="var(--color-count)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Forecast vs. Actual</CardTitle>
          <CardDescription>Daily progress against the forecast.</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={lineChartConfig} className="h-[250px] w-full">
            <LineChart data={lineChartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} fontSize={12} />
              <YAxis />
              <Tooltip content={<ChartTooltipContent indicator="dot" />} />
              <Legend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke="var(--color-forecast)"
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke="var(--color-actual)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </>
  );
}
