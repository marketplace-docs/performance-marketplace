'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from 'lucide-react';

export default function ProductivityMenu({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <CardTitle>Productivity</CardTitle>
        <Button variant="outline" size="icon">
          {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </CardHeader>
      {isOpen && (
        <CardContent>
          {children}
        </CardContent>
      )}
    </Card>
  );
}
