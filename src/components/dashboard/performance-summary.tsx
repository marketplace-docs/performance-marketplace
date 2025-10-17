'use client';

import { Card } from "@/components/ui/card";

type PerformanceSummaryProps = {
    data: {
        picker: number;
        packer: number;
        totalPacked: number;
    }
}

const PerformanceSummaryItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex-1 p-4 rounded-lg bg-card border shadow-sm">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
);

export default function PerformanceSummary({ data }: PerformanceSummaryProps) {
    return (
        <div className="my-6 flex gap-4 justify-between">
            <PerformanceSummaryItem label="Picker" value={data.picker} />
            <PerformanceSummaryItem label="Packer" value={data.packer} />
            <PerformanceSummaryItem label="Total Packed" value={data.totalPacked} />
        </div>
    );
}
