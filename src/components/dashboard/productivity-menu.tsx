'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/hooks/use-admin";

export default function ProductivityMenu() {
  const { setIsProductivityDialogOpen } = useAdmin();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Productivity</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={() => setIsProductivityDialogOpen(true)}>
          Open Performance Marketplace
        </Button>
      </CardContent>
    </Card>
  );
}
