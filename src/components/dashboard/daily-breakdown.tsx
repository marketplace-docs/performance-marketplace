import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

type DailyData = {
  day: string;
  actualPacked: number;
  totalPacked: number;
  fulfillmentPercentage: number;
};

type DailyBreakdownProps = {
  data: DailyData[];
};

export default function DailyBreakdown({ data }: DailyBreakdownProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Breakdown</CardTitle>
        <CardDescription>
          Packed orders and fulfillment rate for the current period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Day</TableHead>
              <TableHead className="text-right">Actual Packed</TableHead>
              <TableHead className="text-right">Total Packed</TableHead>
              <TableHead className="text-right">Fulfillment %</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.day}>
                <TableCell className="font-medium">{row.day}</TableCell>
                <TableCell className="text-right">{row.actualPacked.toLocaleString()}</TableCell>
                <TableCell className="text-right">{row.totalPacked.toLocaleString()}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={row.fulfillmentPercentage > 95 ? "default" : "secondary"} className={row.fulfillmentPercentage > 95 ? 'bg-accent text-accent-foreground' : ''}>
                    {row.fulfillmentPercentage.toFixed(2)}%
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
