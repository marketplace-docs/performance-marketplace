'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type HourlyData = {
  hour: string;
  value: number;
}[];

type BacklogChartProps = {
  data: HourlyData;
};

export default function BacklogChart({ data }: BacklogChartProps) {
  return (
    <div className="mt-6">
      <div className="grid grid-cols-12 gap-2 text-center mb-6">
        {data.map((item) => (
          <div key={item.hour} className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
            <div className="text-xs text-muted-foreground">{item.hour}</div>
            <div className="font-bold">{item.value}</div>
          </div>
        ))}
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} domain={[0, 625]} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
            />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
