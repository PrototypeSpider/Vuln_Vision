
import { Vulnerability, VulnerabilityStats, Project } from "./types";

export const mockVulnerabilities: Vulnerability[] = [
  {
    id: "v1",
    title: "Cross-Site Scripting (XSS) in React Markdown",
    cveId: "CVE-2023-1234",
    severity: "critical",
    affected_package: "react-markdown",
    affected_versions: "<8.0.0",
    fixed_version: "8.0.1",
    description: "A cross-site scripting vulnerability in the react-markdown package allows attackers to inject arbitrary JavaScript code.",
    discovered_date: "2023-12-15",
    status: "open",
    project: "User Dashboard",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2023-1234"],
    score: 9.8
  },
  {
    id: "v2",
    title: "SQL Injection in Database Connector",
    cveId: "CVE-2023-5678",
    severity: "high",
    affected_package: "sql-connector",
    affected_versions: "<=2.3.1",
    fixed_version: "2.4.0",
    description: "SQL injection vulnerability in query builder could allow attackers to execute arbitrary SQL commands.",
    discovered_date: "2023-11-22",
    status: "fixed",
    project: "Backend API",
    language: "TypeScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2023-5678"],
    score: 8.5
  },
  {
    id: "v3",
    title: "Path Traversal in File Upload",
    cveId: "CVE-2023-9876",
    severity: "medium",
    affected_package: "file-uploader",
    affected_versions: "<3.0.0",
    fixed_version: "3.0.2",
    description: "Path traversal vulnerability in file upload component allows uploading files to arbitrary locations.",
    discovered_date: "2023-10-18",
    status: "in_progress",
    project: "Content Manager",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2023-9876"],
    score: 6.5
  },
  {
    id: "v4",
    title: "Information Disclosure in Logger",
    cveId: "CVE-2023-4321",
    severity: "low",
    affected_package: "logger-plus",
    affected_versions: "1.x.x",
    fixed_version: "2.0.0",
    description: "Logger may expose sensitive information in verbose mode.",
    discovered_date: "2023-09-05",
    status: "open",
    project: "Authentication Service",
    language: "TypeScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2023-4321"],
    score: 3.2
  },
  {
    id: "v5",
    title: "Prototype Pollution in Object Merger",
    cveId: "CVE-2024-1111",
    severity: "high",
    affected_package: "deep-merger",
    affected_versions: "<1.5.0",
    fixed_version: "1.5.0",
    description: "Prototype pollution vulnerability allows attackers to modify JavaScript object behavior.",
    discovered_date: "2024-01-10",
    status: "open",
    project: "Backend API",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-1111"],
    score: 7.6
  },
  {
    id: "v6",
    title: "Command Injection in Shell Executor",
    cveId: "CVE-2024-2222",
    severity: "critical",
    affected_package: "shell-exec",
    affected_versions: "<=0.8.2",
    fixed_version: "0.9.0",
    description: "Shell command injection vulnerability allows remote code execution.",
    discovered_date: "2024-02-05",
    status: "fixed",
    project: "Deployment Tool",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-2222"],
    score: 9.5
  },
  {
    id: "v7",
    title: "Insecure Randomness in Token Generator",
    cveId: "CVE-2024-3333",
    severity: "medium",
    affected_package: "token-gen",
    affected_versions: "<2.1.0",
    fixed_version: "2.1.0",
    description: "Weak randomness in token generation makes tokens predictable.",
    discovered_date: "2024-03-15",
    status: "in_progress",
    project: "Authentication Service",
    language: "TypeScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-3333"],
    score: 5.9
  },
  {
    id: "v8",
    title: "Memory Leak in Stream Processor",
    cveId: "CVE-2024-4444",
    severity: "low",
    affected_package: "stream-proc",
    affected_versions: "0.x.x",
    fixed_version: "1.0.0",
    description: "Memory leak in stream processor can lead to service degradation over time.",
    discovered_date: "2024-01-20",
    status: "open",
    project: "Data Pipeline",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-4444"],
    score: 3.8
  },
  {
    id: "v9",
    title: "Regular Expression DoS",
    cveId: "CVE-2024-5555",
    severity: "medium",
    affected_package: "regex-validator",
    affected_versions: "<4.2.0",
    fixed_version: "4.2.0",
    description: "Regular expression denial of service vulnerability in input validation.",
    discovered_date: "2024-02-25",
    status: "false_positive",
    project: "User Dashboard",
    language: "TypeScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-5555"],
    score: 5.3
  },
  {
    id: "v10",
    title: "Improper Access Control in Admin API",
    cveId: "CVE-2024-6666",
    severity: "critical",
    affected_package: "admin-api",
    affected_versions: "<=1.2.3",
    fixed_version: "1.3.0",
    description: "Missing authorization checks in admin API can lead to privilege escalation.",
    discovered_date: "2024-03-01",
    status: "open",
    project: "Admin Panel",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-6666"],
    score: 9.1
  },
  {
    id: "v11",
    title: "Insecure Deserialization",
    cveId: "CVE-2024-7777",
    severity: "high",
    affected_package: "json-parser",
    affected_versions: "<3.0.0",
    fixed_version: "3.0.0",
    description: "Insecure deserialization of untrusted data can lead to remote code execution.",
    discovered_date: "2024-01-05",
    status: "fixed",
    project: "Content Manager",
    language: "JavaScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-7777"],
    score: 8.1
  },
  {
    id: "v12",
    title: "CSRF Vulnerability in Form Handler",
    cveId: "CVE-2024-8888",
    severity: "medium",
    affected_package: "form-handler",
    affected_versions: "<=1.9.2",
    fixed_version: "2.0.0",
    description: "Cross-Site Request Forgery vulnerability allows unauthorized actions.",
    discovered_date: "2024-02-10",
    status: "in_progress",
    project: "User Dashboard",
    language: "TypeScript",
    references: ["https://nvd.nist.gov/vuln/detail/CVE-2024-8888"],
    score: 6.8
  }
];

export const mockProjects: Project[] = [
  {
    id: "p1",
    name: "User Dashboard",
    description: "Frontend dashboard for user management",
    language: "JavaScript",
    repository_url: "https://github.com/example/user-dashboard",
    vulnerabilities_count: {
      critical: 1,
      high: 0,
      medium: 2,
      low: 0,
      info: 0
    }
  },
  {
    id: "p2",
    name: "Backend API",
    description: "Main API service for the application",
    language: "TypeScript",
    repository_url: "https://github.com/example/backend-api",
    vulnerabilities_count: {
      critical: 0,
      high: 2,
      medium: 0,
      low: 0,
      info: 1
    }
  },
  {
    id: "p3",
    name: "Authentication Service",
    description: "Authentication and authorization service",
    language: "TypeScript",
    repository_url: "https://github.com/example/auth-service",
    vulnerabilities_count: {
      critical: 0,
      high: 0,
      medium: 1,
      low: 1,
      info: 0
    }
  },
  {
    id: "p4",
    name: "Content Manager",
    description: "Content management system",
    language: "JavaScript",
    repository_url: "https://github.com/example/content-manager",
    vulnerabilities_count: {
      critical: 0,
      high: 1,
      medium: 1,
      low: 0,
      info: 0
    }
  },
  {
    id: "p5",
    name: "Deployment Tool",
    description: "Internal deployment and CI/CD tool",
    language: "JavaScript",
    repository_url: "https://github.com/example/deployment-tool",
    vulnerabilities_count: {
      critical: 1,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    }
  },
  {
    id: "p6",
    name: "Data Pipeline",
    description: "Data processing and analytics pipeline",
    language: "JavaScript",
    repository_url: "https://github.com/example/data-pipeline",
    vulnerabilities_count: {
      critical: 0,
      high: 0,
      medium: 0,
      low: 1,
      info: 0
    }
  },
  {
    id: "p7",
    name: "Admin Panel",
    description: "Administrative control panel",
    language: "JavaScript",
    repository_url: "https://github.com/example/admin-panel",
    vulnerabilities_count: {
      critical: 1,
      high: 0,
      medium: 0,
      low: 0,
      info: 0
    }
  }
];

export const mockVulnerabilityStats: VulnerabilityStats = {
  totalCount: mockVulnerabilities.length,
  bySeverity: {
    critical: mockVulnerabilities.filter(v => v.severity === "critical").length,
    high: mockVulnerabilities.filter(v => v.severity === "high").length,
    medium: mockVulnerabilities.filter(v => v.severity === "medium").length,
    low: mockVulnerabilities.filter(v => v.severity === "low").length,
    info: mockVulnerabilities.filter(v => v.severity === "info").length
  },
  byStatus: {
    open: mockVulnerabilities.filter(v => v.status === "open").length,
    fixed: mockVulnerabilities.filter(v => v.status === "fixed").length,
    in_progress: mockVulnerabilities.filter(v => v.status === "in_progress").length,
    false_positive: mockVulnerabilities.filter(v => v.status === "false_positive").length
  },
  byProject: mockVulnerabilities.reduce((acc, curr) => {
    acc[curr.project] = (acc[curr.project] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  byLanguage: mockVulnerabilities.reduce((acc, curr) => {
    acc[curr.language] = (acc[curr.language] || 0) + 1;
    return acc;
  }, {} as Record<string, number>),
  timeline: [
    { date: "2023-09", count: 1 },
    { date: "2023-10", count: 1 },
    { date: "2023-11", count: 1 },
    { date: "2023-12", count: 1 },
    { date: "2024-01", count: 3 },
    { date: "2024-02", count: 3 },
    { date: "2024-03", count: 2 }
  ]
};

export function getSeverityColor(severity: string): string {
  switch(severity) {
    case "critical": return "text-critical bg-critical/10 border-critical/20";
    case "high": return "text-high bg-high/10 border-high/20";
    case "medium": return "text-medium bg-medium/10 border-medium/20";
    case "low": return "text-low bg-low/10 border-low/20";
    case "info": return "text-info bg-info/10 border-info/20";
    default: return "text-muted-foreground bg-muted/10";
  }
}

export function getStatusColor(status: string): string {
  switch(status) {
    case "open": return "text-critical bg-critical/10";
    case "fixed": return "text-low bg-low/10";
    case "in_progress": return "text-medium bg-medium/10";
    case "false_positive": return "text-muted-foreground bg-muted/10";
    default: return "text-muted-foreground bg-muted/10";
  }
}
