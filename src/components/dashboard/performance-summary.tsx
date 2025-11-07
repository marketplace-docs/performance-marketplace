'use client';

type PerformanceSummaryProps = {
    data: {
        totalPacked: number;
    }
}

const PerformanceSummaryItem = ({ label, value }: { label: string; value: string | number }) => (
    <div className="flex-1 p-4 rounded-lg bg-card border shadow-sm text-center">
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="text-2xl font-bold text-destructive">{typeof value === 'number' ? value.toLocaleString() : value}</div>
    </div>
);

export default function PerformanceSummary({ data }: PerformanceSummaryProps) {
    return (
        <div className="my-6 grid grid-cols-1 gap-4">
            <PerformanceSummaryItem label="Total Packed" value={data.totalPacked.toLocaleString()} />
        </div>
    );
}
