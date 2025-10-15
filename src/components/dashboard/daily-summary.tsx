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
            <TableCell>{data.day1.day}</TableCell>
            <TableCell>{data.day1.actual.toLocaleString()}</TableCell>
            <TableCell>{data.day1.total.toLocaleString()}</TableCell>
            <TableCell>{data.day2.day}</TableCell>
            <TableCell>{data.day2.actual.toLocaleString()}</TableCell>
            <TableCell>{data.day2.total.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
