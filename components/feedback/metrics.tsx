"use client";

import { IconFilter, IconCalendar, IconBrain, IconMessageCircle, IconCode, IconPuzzle } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for metrics
const skillMetrics = [
  { skill: "Technical Knowledge", score: 82, color: "#8884d8", icon: IconCode },
  { skill: "Problem Solving", score: 79, color: "#f97316", icon: IconPuzzle },
  { skill: "Communication", score: 86, color: "#10b981", icon: IconMessageCircle },
  { skill: "Critical Thinking", score: 78, color: "#6366f1", icon: IconBrain }
];

export function FeedbackMetrics() {
  return (
    <Card className="p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <Tabs defaultValue="all" className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="all">All Metrics</TabsTrigger>
              <TabsTrigger value="technical">Technical</TabsTrigger>
              <TabsTrigger value="behavioral">Behavioral</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8">
                  <IconCalendar className="h-4 w-4 mr-2" />
                  <span>Last 3 Months</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Last Month</DropdownMenuItem>
                <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
                <DropdownMenuItem>Last 6 Months</DropdownMenuItem>
                <DropdownMenuItem>All Time</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {skillMetrics.map((metric, i) => (
            <div key={i} className="flex items-center gap-3 p-3 border rounded-lg bg-card">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" 
                   style={{ backgroundColor: `${metric.color}15` }}>
                <metric.icon style={{ color: metric.color }} className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium text-sm">{metric.skill}</span>
                  <span className="font-bold">{metric.score}%</span>
                </div>
                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${metric.score}%`, backgroundColor: metric.color }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}