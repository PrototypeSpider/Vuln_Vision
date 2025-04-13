
import React from "react";
import { 
  AlertTriangle, 
  AreaChart, 
  ClipboardCheck, 
  Clock, 
  CodeXml, 
  PackageOpen, 
  Shield, 
  Wrench 
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { StatCard } from "@/components/dashboard/StatCard";
import { SeverityDistribution } from "@/components/dashboard/SeverityDistribution";
import { VulnerabilityTimeline } from "@/components/dashboard/VulnerabilityTimeline";
import { VulnerabilityTable } from "@/components/dashboard/VulnerabilityTable";
import { ApiKeyForm } from "@/components/dashboard/ApiKeyForm";
import { 
  mockVulnerabilities, 
  mockVulnerabilityStats 
} from "@/lib/mock-data";

export default function Dashboard() {
  const severityData = [
    { name: "Critical", value: mockVulnerabilityStats.bySeverity.critical, color: "hsl(var(--critical))" },
    { name: "High", value: mockVulnerabilityStats.bySeverity.high, color: "hsl(var(--high))" },
    { name: "Medium", value: mockVulnerabilityStats.bySeverity.medium, color: "hsl(var(--medium))" },
    { name: "Low", value: mockVulnerabilityStats.bySeverity.low, color: "hsl(var(--low))" }
  ].filter(item => item.value > 0);

  return (
    <AppLayout>
      <h1 className="text-3xl font-bold mb-6">Vulnerability Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Total Vulnerabilities"
          value={mockVulnerabilityStats.totalCount}
          icon={AlertTriangle}
          description="Across all projects"
          trend={12}
        />
        <StatCard
          title="Open Issues"
          value={mockVulnerabilityStats.byStatus.open}
          icon={Shield}
          description="Requiring attention"
          trend={8}
        />
        <StatCard
          title="Recently Fixed"
          value={mockVulnerabilityStats.byStatus.fixed}
          icon={ClipboardCheck}
          description="Last 30 days"
          trend={-5}
        />
        <StatCard
          title="Dependencies"
          value="152"
          icon={PackageOpen}
          description="Monitored packages"
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SeverityDistribution data={severityData} />
        <VulnerabilityTimeline data={mockVulnerabilityStats.timeline} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-1">
          <ApiKeyForm />
        </div>
        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <StatCard
            title="Average Age"
            value="18 days"
            icon={Clock}
            description="For open vulnerabilities"
          />
          <StatCard
            title="Fix Rate"
            value="76%"
            icon={Wrench}
            description="30-day resolution rate"
          />
          <StatCard
            title="Scanned Projects"
            value="7"
            icon={CodeXml}
            description="All repositories"
          />
          <StatCard
            title="Risk Score"
            value="42"
            icon={AreaChart}
            description="Overall security rating"
          />
        </div>
      </div>
      
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Recent Vulnerabilities</h2>
        <VulnerabilityTable vulnerabilities={mockVulnerabilities} />
      </div>
    </AppLayout>
  );
}
