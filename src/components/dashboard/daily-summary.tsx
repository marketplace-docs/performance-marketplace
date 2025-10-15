import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DailySummaryProps = {
  data: {
    day1: { day: number; actual: number; total: number; };
    day2: { day: number; actual: number; total: number };
  };
};

export default function DailySummary({ data }: DailySummaryProps) {
  const day1 = data.day1 || { day: 1, actual: 0, total: 0 };
  const day2 = data.day2 || { day: 2, actual: 0, total: 0 };

  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{day1.day}</TableCell>
            <TableCell>{(day1.actual || 0).toLocaleString()}</TableCell>
            <TableCell>{(day1.total || 0).toLocaleString()}</TableCell>
            <TableCell>{day2.day}</TableCell>
            <TableCell>{(day2.actual || 0).toLocaleString()}</TableCell>
            <TableCell>{(day2.total || 0).toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
