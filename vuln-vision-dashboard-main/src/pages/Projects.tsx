
import React from "react";
import { FileCode, FolderOpen, GitBranch, GithubIcon, GitlabIcon, BookIcon } from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ProjectCardProps {
  name: string;
  description: string;
  repository: string;
  type: "github" | "gitlab" | "bitbucket" | "other";
  lastScan: string;
  vulnerabilityCount: number;
}

const ProjectCard = ({ name, description, repository, type, lastScan, vulnerabilityCount }: ProjectCardProps) => {
  const getIcon = () => {
    switch (type) {
      case "github":
        return <GithubIcon className="h-5 w-5" />;
      case "gitlab":
        return <GitlabIcon className="h-5 w-5" />;
      case "bitbucket":
        return <BookIcon className="h-5 w-5" />; // Replaced BitbucketIcon with BookIcon
      default:
        return <GitBranch className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            {getIcon()}
            <CardTitle className="text-lg">{name}</CardTitle>
          </div>
          <Badge variant={vulnerabilityCount > 0 ? "destructive" : "outline"}>
            {vulnerabilityCount} {vulnerabilityCount === 1 ? "issue" : "issues"}
          </Badge>
        </div>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <div className="flex items-center text-muted-foreground">
            <GitBranch className="h-4 w-4 mr-2" />
            <span className="truncate">{repository}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <FileCode className="h-4 w-4 mr-2" />
            <span>Last scanned: {lastScan}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between">
        <Button variant="outline" size="sm">
          <FileCode className="h-4 w-4 mr-2" />
          View Details
        </Button>
        <Button size="sm">
          <FolderOpen className="h-4 w-4 mr-2" />
          Scan Now
        </Button>
      </CardFooter>
    </Card>
  );
};

export default function Projects() {
  const projects = [
    {
      name: "Frontend App",
      description: "Main customer-facing React application",
      repository: "org/frontend-app",
      type: "github" as const,
      lastScan: "2 hours ago",
      vulnerabilityCount: 3
    },
    {
      name: "Backend API",
      description: "Node.js REST API server",
      repository: "org/backend-api",
      type: "github" as const,
      lastScan: "1 day ago",
      vulnerabilityCount: 0
    },
    {
      name: "Authentication Service",
      description: "User auth and identity management",
      repository: "org/auth-service",
      type: "gitlab" as const,
      lastScan: "3 days ago",
      vulnerabilityCount: 2
    },
    {
      name: "Data Processor",
      description: "Big data processing service",
      repository: "org/data-processor",
      type: "bitbucket" as const,
      lastScan: "5 days ago",
      vulnerabilityCount: 5
    },
    {
      name: "Mobile App",
      description: "React Native mobile application",
      repository: "org/mobile-app",
      type: "github" as const,
      lastScan: "12 hours ago",
      vulnerabilityCount: 1
    },
    {
      name: "Infrastructure",
      description: "Terraform infrastructure code",
      repository: "org/infrastructure",
      type: "github" as const,
      lastScan: "1 week ago",
      vulnerabilityCount: 0
    }
  ];

  return (
    <AppLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>
          <FolderOpen className="h-5 w-5 mr-2" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </AppLayout>
  );
}
