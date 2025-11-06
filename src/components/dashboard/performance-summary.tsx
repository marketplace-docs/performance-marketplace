'use client';

import { Card } from "@/components/ui/card";

type PerformanceSummaryProps = {
    data: {
        picker: number;
        packer: number;
        totalPacked: number;
        averageHoursPacked: number;
    }
}

const PerformanceSummaryItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex-1 p-4 rounded-lg bg-card border shadow-sm">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold text-destructive">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
);

export default function PerformanceSummary({ data }: PerformanceSummaryProps) {
    return (
        <div className="my-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <PerformanceSummaryItem label="Picker" value={data.picker.toLocaleString()} />
            <PerformanceSummaryItem label="Packer" value={data.packer.toLocaleString()} />
            <PerformanceSummaryItem label="Total Packed" value={data.totalPacked.toLocaleString()} />
            <PerformanceSummaryItem label="Average Hours Packed" value={data.averageHoursPacked.toLocaleString()} />
        </div>
    );
}
