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
    day1: { day: number; actual: number };
    day2: { day: number; total: number };
  };
};

export default function DailySummary({ data }: DailySummaryProps) {
  return (
    <div className="w-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Day</TableHead>
            <TableHead>Actual</TableHead>
            <TableHead>Day</TableHead>
            <TableHead>Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{data.day1.day}</TableCell>
            <TableCell>{data.day1.actual.toLocaleString()}</TableCell>
            <TableCell>{data.day2.day}</TableCell>
            <TableCell>{data.day2.total.toLocaleString()}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
