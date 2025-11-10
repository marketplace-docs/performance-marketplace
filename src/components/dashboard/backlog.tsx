'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, RefreshCcw } from 'lucide-react';
import BacklogChart from './backlog-chart';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useAdmin } from '@/hooks/use-admin';


type HourlyData = {
  hour: string;
  value: number;
}[];

type BacklogProps = {
  hourlyData: HourlyData;
};

export default function Backlog({ hourlyData }: BacklogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { handleBacklogReset } = useAdmin();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>BACKLOG</CardTitle>
        <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon">
                  <RefreshCcw className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will reset all backlog data to zero.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleBacklogReset}>Reset</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
        </div>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <BacklogChart data={hourlyData} />
        </CardContent>
      )}
    </Card>
  );
}
