
import React from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertTriangle, Lock, FileCheck, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Security() {
  const { toast } = useToast();
  
  const handleScan = () => {
    toast({
      title: "Security Scan Initiated",
      description: "A full security scan has been started. This may take a few minutes.",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Security Overview</h1>
          <Button onClick={handleScan}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Run Security Scan
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Shield className="mr-2 h-5 w-5 text-green-500" />
                Security Score
              </CardTitle>
              <CardDescription>Overall system security</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">76/100</div>
              <Progress value={76} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">Good standing - 5 points improvement needed</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                Critical Findings
              </CardTitle>
              <CardDescription>High priority issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">3</div>
              <div className="text-sm text-muted-foreground">
                <ul className="list-disc list-inside space-y-1">
                  <li>Outdated dependencies (2)</li>
                  <li>Insecure configuration (1)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Lock className="mr-2 h-5 w-5 text-blue-500" />
                Compliance Status
              </CardTitle>
              <CardDescription>Regulatory compliance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-2">92%</div>
              <Progress value={92} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">OWASP Top 10 compliant</p>
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileCheck className="mr-2 h-5 w-5" />
              Recent Security Checks
            </CardTitle>
            <CardDescription>
              History of security scans and their results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "2025-04-12", status: "Completed", findings: 5, score: 76 },
                { date: "2025-04-05", status: "Completed", findings: 7, score: 72 },
                { date: "2025-03-29", status: "Completed", findings: 8, score: 68 },
                { date: "2025-03-22", status: "Completed", findings: 12, score: 61 },
              ].map((check, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0">
                  <div>
                    <div className="font-medium">{check.date}</div>
                    <div className="text-sm text-muted-foreground">
                      {check.findings} issues found
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-sm">Score: {check.score}/100</div>
                    <Badge color={check.score > 70 ? "bg-green-500/10 text-green-500" : "bg-amber-500/10 text-amber-500"} className="px-2 py-0.5 rounded-full text-xs">
                      {check.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

// Custom Badge component for the security page
const Badge = ({ 
  children, 
  className, 
  color 
}: { 
  children: React.ReactNode; 
  className?: string; 
  color?: string; 
}) => {
  return (
    <span className={`inline-flex items-center ${color || "bg-primary/10 text-primary"} ${className}`}>
      {children}
    </span>
  );
};
