
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description?: string;
  trend?: number;
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon,
  description, 
  trend,
  className
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(description || trend !== undefined) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center">
            {trend !== undefined && (
              <span className={cn(
                "mr-1 text-xs",
                trend > 0 ? "text-destructive" : "text-low"
              )}>
                {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}%
              </span>
            )}
            {description}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
