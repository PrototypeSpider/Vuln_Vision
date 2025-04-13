
import React from "react";
import { 
  LayoutDashboard, 
  Shield, 
  Search, 
  Clock, 
  Cog, 
  FileCode, 
  Users, 
  PackageOpen,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  to: string;
  active?: boolean;
  collapsed?: boolean;
}

function SidebarItem({ icon: Icon, label, to, active, collapsed }: SidebarItemProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        collapsed ? "px-2" : "px-4"
      )}
      title={collapsed ? label : undefined}
      asChild
    >
      <Link to={to}>
        <Icon className={cn("h-5 w-5", !collapsed && "mr-2")} />
        {!collapsed && <span>{label}</span>}
      </Link>
    </Button>
  );
}

interface SidebarProps {
  collapsed?: boolean;
}

export function Sidebar({ collapsed = false }: SidebarProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside 
      className={cn(
        "bg-card h-full border-r overflow-y-auto scrollbar-hide transition-all duration-300 ease-in-out",
        collapsed ? "w-14" : "w-64"
      )}
    >
      <div className="flex flex-col py-6 h-full">
        <div className="px-3 mb-6">
          <p className={cn(
            "text-xs text-muted-foreground uppercase font-bold tracking-wider",
            collapsed ? "text-center" : "px-1"
          )}>
            {collapsed ? "Main" : "Main Navigation"}
          </p>
        </div>
        
        <div className="space-y-1 px-3">
          <SidebarItem 
            icon={LayoutDashboard} 
            label="Dashboard" 
            to="/dashboard" 
            active={currentPath === "/dashboard"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={AlertTriangle} 
            label="Vulnerabilities" 
            to="/vulnerabilities" 
            active={currentPath === "/vulnerabilities"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={Shield} 
            label="Security" 
            to="/security" 
            active={currentPath === "/security"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={PackageOpen} 
            label="Dependencies" 
            to="/dependencies" 
            active={currentPath === "/dependencies"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={FileCode} 
            label="Projects" 
            to="/projects" 
            active={currentPath === "/projects"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={Search} 
            label="Explore" 
            to="/explore" 
            active={currentPath === "/explore"} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={Clock} 
            label="History" 
            to="/history" 
            active={currentPath === "/history"} 
            collapsed={collapsed} 
          />
        </div>
        
        <div className="mt-auto">
          <div className="px-3 mb-2">
            <p className={cn(
              "text-xs text-muted-foreground uppercase font-bold tracking-wider",
              collapsed ? "text-center" : "px-1"
            )}>
              {collapsed ? "More" : "Management"}
            </p>
          </div>
          <div className="space-y-1 px-3">
            <SidebarItem 
              icon={Users} 
              label="Team" 
              to="/team" 
              active={currentPath === "/team"} 
              collapsed={collapsed} 
            />
            <SidebarItem 
              icon={Cog} 
              label="Settings" 
              to="/settings" 
              active={currentPath === "/settings"} 
              collapsed={collapsed} 
            />
          </div>
        </div>
      </div>
    </aside>
  );
}
