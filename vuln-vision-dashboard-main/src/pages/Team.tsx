
import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Users, UserPlus, Mail, Phone, Building, Shield, User } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  phone?: string;
  department?: string;
  accessLevel: "admin" | "developer" | "viewer";
  lastActive: string;
}

const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Lead Developer",
    email: "alex@example.com",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Alex",
    phone: "555-123-4567",
    department: "Engineering",
    accessLevel: "admin",
    lastActive: "2 hours ago"
  },
  {
    id: "2",
    name: "Jamie Smith",
    role: "Security Analyst",
    email: "jamie@example.com",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Jamie",
    department: "Security",
    accessLevel: "developer",
    lastActive: "1 day ago"
  },
  {
    id: "3",
    name: "Taylor Reed",
    role: "DevOps Engineer",
    email: "taylor@example.com",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Taylor",
    phone: "555-987-6543",
    department: "Operations",
    accessLevel: "developer",
    lastActive: "Just now"
  },
  {
    id: "4",
    name: "Casey Wilson",
    role: "Product Manager",
    email: "casey@example.com",
    avatar: "https://api.dicebear.com/6.x/avataaars/svg?seed=Casey",
    department: "Product",
    accessLevel: "viewer",
    lastActive: "3 days ago"
  }
];

export default function Team() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);
  const [showAddMemberDialog, setShowAddMemberDialog] = useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newMember, setNewMember] = useState<{
    name: string;
    role: string;
    email: string;
    department: string;
    accessLevel: "admin" | "developer" | "viewer";
  }>({
    name: "",
    role: "",
    email: "",
    department: "",
    accessLevel: "viewer"
  });
  const { toast } = useToast();

  const handleAddMember = () => {
    if (!newMember.name || !newMember.email) {
      toast({
        title: "Missing information",
        description: "Please provide at least a name and email",
        variant: "destructive"
      });
      return;
    }
    
    const newTeamMember: TeamMember = {
      id: Date.now().toString(),
      name: newMember.name,
      role: newMember.role,
      email: newMember.email,
      avatar: `https://api.dicebear.com/6.x/avataaars/svg?seed=${newMember.name}`,
      department: newMember.department,
      accessLevel: newMember.accessLevel,
      lastActive: "Just now"
    };
    
    setTeamMembers([...teamMembers, newTeamMember]);
    setShowAddMemberDialog(false);
    setNewMember({
      name: "",
      role: "",
      email: "",
      department: "",
      accessLevel: "viewer" as const
    });
    
    toast({
      title: "Member added",
      description: `${newMember.name} has been added to the team`
    });
  };

  const handleViewProfile = (member: TeamMember) => {
    setSelectedMember(member);
    setShowProfileDialog(true);
  };

  const getAccessLevelBadge = (level: TeamMember["accessLevel"]) => {
    switch (level) {
      case "admin":
        return <Badge className="bg-red-500">Admin</Badge>;
      case "developer":
        return <Badge className="bg-blue-500">Developer</Badge>;
      case "viewer":
        return <Badge className="bg-gray-500">Viewer</Badge>;
      default:
        return null;
    }
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Team Management</h1>
            <p className="text-muted-foreground">
              Add, manage, and configure access for team members
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => setShowAddMemberDialog(true)}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Team Member
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Team Members ({teamMembers.length})
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <Card key={member.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-muted p-6 flex flex-col items-center">
                      <Avatar className="h-16 w-16 mb-2">
                        <img src={member.avatar} alt={member.name} />
                      </Avatar>
                      <h3 className="font-semibold text-lg">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                      <div className="mt-2">{getAccessLevelBadge(member.accessLevel)}</div>
                    </div>
                    <div className="p-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        {member.email}
                      </div>
                      {member.department && (
                        <div className="flex items-center text-sm">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          {member.department}
                        </div>
                      )}
                      <div className="flex items-center text-sm justify-between">
                        <span className="text-xs text-muted-foreground">
                          Active {member.lastActive}
                        </span>
                        <Button variant="ghost" size="sm" onClick={() => handleViewProfile(member)}>
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Member Dialog */}
      <Dialog open={showAddMemberDialog} onOpenChange={setShowAddMemberDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Team Member</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={newMember.name}
                onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                placeholder="Full name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newMember.email}
                onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                placeholder="Email address"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={newMember.role}
                onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                placeholder="Job title or role"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={newMember.department}
                onChange={(e) => setNewMember({...newMember, department: e.target.value})}
                placeholder="Department"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="access">Access Level</Label>
              <select
                id="access"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={newMember.accessLevel}
                onChange={(e) => setNewMember({...newMember, accessLevel: e.target.value as "admin" | "developer" | "viewer"})}
              >
                <option value="viewer">Viewer</option>
                <option value="developer">Developer</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddMemberDialog(false)}>Cancel</Button>
            <Button onClick={handleAddMember}>Add Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Profile Dialog */}
      {selectedMember && (
        <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Team Member Profile</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 mb-2">
                  <img src={selectedMember.avatar} alt={selectedMember.name} />
                </Avatar>
                <h3 className="font-semibold text-lg">{selectedMember.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedMember.role}</p>
                <div className="mt-2">{getAccessLevelBadge(selectedMember.accessLevel)}</div>
              </div>
              <div className="flex-1">
                <Tabs defaultValue="info">
                  <TabsList className="mb-4">
                    <TabsTrigger value="info">Information</TabsTrigger>
                    <TabsTrigger value="access">Access</TabsTrigger>
                    <TabsTrigger value="activity">Activity</TabsTrigger>
                  </TabsList>
                  <TabsContent value="info" className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">Email:</span>
                        <span className="ml-2">{selectedMember.email}</span>
                      </div>
                      {selectedMember.phone && (
                        <div className="flex items-center">
                          <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Phone:</span>
                          <span className="ml-2">{selectedMember.phone}</span>
                        </div>
                      )}
                      {selectedMember.department && (
                        <div className="flex items-center">
                          <Building className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="font-medium">Department:</span>
                          <span className="ml-2">{selectedMember.department}</span>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="access">
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Shield className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="font-medium">Access Level:</span>
                        <span className="ml-2">{selectedMember.accessLevel}</span>
                      </div>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium mb-2">Permissions</h4>
                        <ul className="space-y-1 text-sm">
                          {selectedMember.accessLevel === "admin" && (
                            <>
                              <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Full administrative access</li>
                              <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Manage team members</li>
                              <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Configure security settings</li>
                            </>
                          )}
                          {(selectedMember.accessLevel === "admin" || selectedMember.accessLevel === "developer") && (
                            <>
                              <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> View and edit vulnerability data</li>
                              <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> Run security scans</li>
                            </>
                          )}
                          <li className="flex items-center"><div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div> View vulnerability reports</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="activity">
                    <div className="space-y-3">
                      <p className="text-sm">Last active: {selectedMember.lastActive}</p>
                      <div className="border rounded-md p-3">
                        <h4 className="font-medium mb-2">Recent Activity</h4>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                            <div>
                              <p>Reviewed vulnerability CVE-2023-1234</p>
                              <p className="text-xs text-muted-foreground">Yesterday at 2:30 PM</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                            <div>
                              <p>Initiated security scan for Project A</p>
                              <p className="text-xs text-muted-foreground">3 days ago at 10:15 AM</p>
                            </div>
                          </li>
                          <li className="flex items-start">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2 mt-1.5"></div>
                            <div>
                              <p>Updated team notification settings</p>
                              <p className="text-xs text-muted-foreground">Last week</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowProfileDialog(false)}>Close</Button>
              <Button>Edit Profile</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </AppLayout>
  );
}
