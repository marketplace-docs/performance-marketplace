'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, LabelList } from 'recharts';

type HourlyData = {
  hour: string;
  value: number;
}[];

type BacklogChartProps = {
  data: HourlyData;
};

const formatNumber = (value: number) => value.toLocaleString();

export default function BacklogChart({ data }: BacklogChartProps) {
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisDomain = [0, Math.ceil(maxValue / 625) * 625 || 625];
  const totalPacked = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="mt-6">
      <div className="grid grid-cols-12 gap-2 text-center mb-6">
        {data.map((item) => (
          <div key={item.hour} className="rounded-lg border bg-card text-card-foreground shadow-sm p-2">
            <div className="text-xs text-muted-foreground">{item.hour}</div>
            <div className="font-bold text-destructive">{formatNumber(item.value)}</div>
          </div>
        ))}
      </div>
      <div className="flex justify-end pr-2">
        <div className="text-right">
            <div className="text-sm text-muted-foreground">Total Packed</div>
            <div className="text-2xl font-bold text-destructive">{totalPacked.toLocaleString()}</div>
        </div>
      </div>
      <div className="h-[300px] mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="hour" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false} 
              axisLine={false} 
              domain={yAxisDomain} 
              tickFormatter={formatNumber}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--background))',
                borderColor: 'hsl(var(--border))',
              }}
              formatter={(value: number) => formatNumber(value)}
            />
            <Bar dataKey="value" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]}>
                <LabelList dataKey="value" position="top" style={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} formatter={formatNumber} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
