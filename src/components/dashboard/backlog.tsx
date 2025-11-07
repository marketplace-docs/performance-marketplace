'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown } from 'lucide-react';
import BacklogChart from './backlog-chart';

type HourlyData = {
  hour: string;
  value: number;
}[];

type BacklogProps = {
  hourlyData: HourlyData;
};

export default function Backlog({ hourlyData }: BacklogProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>BACKLOG</CardTitle>
        <Button variant="outline" size="icon" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          <BacklogChart data={hourlyData} />
        </CardContent>
      )}
    </Card>
  );
}
