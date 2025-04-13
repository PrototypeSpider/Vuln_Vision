
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { VulnerabilityTable } from "@/components/dashboard/VulnerabilityTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockVulnerabilities } from "@/lib/mock-data";
import { Plus, RefreshCw, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Vulnerabilities() {
  const [vulnerabilities, setVulnerabilities] = useState(mockVulnerabilities);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call delay
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Refreshed",
        description: "Vulnerability database has been refreshed.",
      });
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Vulnerabilities</h1>
            <p className="text-muted-foreground">
              Manage and track vulnerabilities across your projects
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh"}
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Manual Entry
            </Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="high">High</TabsTrigger>
            <TabsTrigger value="open">Open</TabsTrigger>
            <TabsTrigger value="fixed">Fixed</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <VulnerabilityTable vulnerabilities={vulnerabilities} />
          </TabsContent>
          <TabsContent value="critical">
            <VulnerabilityTable 
              vulnerabilities={vulnerabilities.filter(v => v.severity === "critical")} 
            />
          </TabsContent>
          <TabsContent value="high">
            <VulnerabilityTable 
              vulnerabilities={vulnerabilities.filter(v => v.severity === "high")} 
            />
          </TabsContent>
          <TabsContent value="open">
            <VulnerabilityTable 
              vulnerabilities={vulnerabilities.filter(v => v.status === "open")} 
            />
          </TabsContent>
          <TabsContent value="fixed">
            <VulnerabilityTable 
              vulnerabilities={vulnerabilities.filter(v => v.status === "fixed")} 
            />
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
