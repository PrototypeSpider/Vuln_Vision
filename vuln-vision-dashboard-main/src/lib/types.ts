
export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";

export interface Vulnerability {
  id: string;
  title: string;
  cveId?: string;
  severity: SeverityLevel;
  affected_package: string;
  affected_versions: string;
  fixed_version?: string;
  description: string;
  discovered_date: string;
  status: "open" | "fixed" | "in_progress" | "false_positive";
  project: string;
  language: string;
  references: string[];
  score?: number;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  language: string;
  repository_url: string;
  vulnerabilities_count: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
}

export interface VulnerabilityStats {
  totalCount: number;
  bySeverity: {
    critical: number;
    high: number;
    medium: number;
    low: number;
    info: number;
  };
  byStatus: {
    open: number;
    fixed: number;
    in_progress: number;
    false_positive: number;
  };
  byProject: Record<string, number>;
  byLanguage: Record<string, number>;
  timeline: {
    date: string;
    count: number;
  }[];
}
