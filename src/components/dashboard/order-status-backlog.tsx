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
import {
  WalletCards,
  Loader2,
  Archive,
  PackageCheck,
} from "lucide-react";
import type { ReactNode } from "react";

type OrderStatus = {
  status: string;
  orderCount: number;
  itemCount: number;
  avgItemsPerOrder: number;
};

type OrderStatusBacklogProps = {
  data: OrderStatus[];
};

const statusIcons: Record<string, ReactNode> = {
  "Payment Accepted": <WalletCards className="h-5 w-5 text-blue-500" />,
  "In Progress": <Loader2 className="h-5 w-5 animate-spin text-yellow-500" />,
  Picked: <Archive className="h-5 w-5 text-orange-500" />,
  Packed: <PackageCheck className="h-5 w-5 text-green-500" />,
};

export default function OrderStatusBacklog({ data }: OrderStatusBacklogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Status Backlog</CardTitle>
        <CardDescription>A detailed view of the current order backlog by status.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Order Count</TableHead>
              <TableHead className="text-right">Item Count</TableHead>
              <TableHead className="text-right">Avg Items/Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.status}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    {statusIcons[row.status]}
                    <span className="font-medium">{row.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{row.orderCount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{row.itemCount.toLocaleString()}</TableCell>
                <TableCell className="text-right">{row.avgItemsPerOrder.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
