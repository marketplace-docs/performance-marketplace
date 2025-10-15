'use client';

import { Card } from "@/components/ui/card";

type PerformanceSummaryProps = {
    data: {
        picker: number;
        packer: number;
        averageHours: number;
    }
}

const PerformanceSummaryItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex-1 p-4 rounded-lg bg-card border shadow-sm">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);

export default function PerformanceSummary({ data }: PerformanceSummaryProps) {
    return (
        <div className="my-6 flex gap-4 justify-between">
            <PerformanceSummaryItem label="Picker" value={data.picker.toLocaleString()} />
            <PerformanceSummaryItem label="Packer" value={data.packer.toLocaleString()} />
            <PerformanceSummaryItem label="Average Hours" value={data.averageHours.toFixed(1)} />
        </div>
    );
}