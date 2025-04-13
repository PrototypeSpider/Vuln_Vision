import React, { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Bell, Shield, User, Globe, Clock, Key, Save, Lock, Mail, RefreshCw } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ProfileAvatarUpload } from "@/components/settings/ProfileAvatarUpload";
import { BioEditor } from "@/components/settings/BioEditor";

const profileFormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
  urls: z
    .object({
      github: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
      website: z.string().url({ message: "Please enter a valid URL." }).optional().or(z.literal("")),
    })
    .optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function Settings() {
  const { toast } = useToast();
  const [apiKey, setApiKey] = useState("sk_test_vulnerability_scanner_key_123456");
  const [showApiKey, setShowApiKey] = useState(false);
  const [isTestingConnection, setIsTestingConnection] = useState(false);
  const [profileAvatar, setProfileAvatar] = useState("https://api.dicebear.com/6.x/avataaars/svg?seed=Alex");
  
  const defaultValues: Partial<ProfileFormValues> = {
    username: "alexjohnson",
    email: "alex@example.com",
    bio: "Security engineer focused on vulnerability analysis and open source security.",
    urls: {
      github: "https://github.com/alexj",
      website: "https://alexjohnson.dev",
    },
  };
  
  const form = useForm<ProfileFormValues>({
    defaultValues,
  });

  function onSubmit(data: ProfileFormValues) {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  }

  const testConnection = () => {
    setIsTestingConnection(true);
    setTimeout(() => {
      setIsTestingConnection(false);
      toast({
        title: "Connection successful",
        description: "Your API key is valid and working correctly.",
      });
    }, 1500);
  };

  const regenerateApiKey = () => {
    const newKey = "sk_test_" + Math.random().toString(36).substring(2, 15);
    setApiKey(newKey);
    toast({
      title: "API Key Regenerated",
      description: "Your new API key has been generated. Please save it securely.",
      variant: "default",
    });
  };

  const handleNotificationSave = () => {
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <AppLayout>
      <div className="flex flex-col space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="profile">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="api">
              <Key className="h-4 w-4 mr-2" />
              API Settings
            </TabsTrigger>
            <TabsTrigger value="notifications">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>
                  Manage your public profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex flex-col items-center md:w-1/3">
                        <ProfileAvatarUpload 
                          initialImage={profileAvatar} 
                          onImageChange={setProfileAvatar}
                        />
                      </div>
                      
                      <div className="md:w-2/3 space-y-6">
                        <FormField
                          control={form.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input placeholder="username" {...field} />
                              </FormControl>
                              <FormDescription>
                                This is your public display name.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.com" {...field} />
                              </FormControl>
                              <FormDescription>
                                Your contact email address.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormDescription className="mt-0 mb-2">
                                Brief description for your profile. Max 160 characters.
                              </FormDescription>
                              <FormControl>
                                <BioEditor 
                                  initialBio={field.value || ""} 
                                  onSave={(value) => field.onChange(value)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium">Links</h3>
                      <p className="text-sm text-muted-foreground">
                        Add links to your website, GitHub, and other platforms.
                      </p>
                      <Separator className="my-4" />
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="urls.github"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>GitHub</FormLabel>
                              <FormControl>
                                <Input placeholder="https://github.com/username" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="urls.website"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Website</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <Button type="submit">
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="api">
            <Card>
              <CardHeader>
                <CardTitle>API Settings</CardTitle>
                <CardDescription>
                  Manage your API keys for vulnerability scanning
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="api-key">API Key</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="api-key"
                      type={showApiKey ? "text" : "password"}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="font-mono"
                    />
                    <Button
                      variant="outline"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? "Hide" : "Show"}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    This API key allows the application to scan for vulnerabilities. Keep it secure.
                  </p>
                </div>
                
                <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
                  <Button onClick={testConnection} disabled={isTestingConnection}>
                    {isTestingConnection ? (
                      <>
                        <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                  <Button variant="outline" onClick={regenerateApiKey}>Regenerate Key</Button>
                  <Button variant="default">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">API Rate Limits</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Daily API calls</span>
                      <span className="font-medium">1,000 / 10,000</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[10%]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monthly scan quota</span>
                      <span className="font-medium">25 / 100</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="bg-primary h-full w-[25%]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Manage how and when you receive notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="critical-alerts">Critical Vulnerability Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive notifications for critical severity vulnerabilities
                          </p>
                        </div>
                        <Switch id="critical-alerts" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="weekly-digest">Weekly Digest</Label>
                          <p className="text-sm text-muted-foreground">
                            Get a weekly summary of all discovered vulnerabilities
                          </p>
                        </div>
                        <Switch id="weekly-digest" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="scan-completion">Scan Completion</Label>
                          <p className="text-sm text-muted-foreground">
                            Be notified when a vulnerability scan completes
                          </p>
                        </div>
                        <Switch id="scan-completion" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="team-actions">Team Actions</Label>
                          <p className="text-sm text-muted-foreground">
                            Notify when team members update vulnerability status
                          </p>
                        </div>
                        <Switch id="team-actions" />
                      </div>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="in-app-alerts">All Vulnerability Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Show notification for any new vulnerability
                          </p>
                        </div>
                        <Switch id="in-app-alerts" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="status-updates">Status Updates</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified when vulnerability status changes
                          </p>
                        </div>
                        <Switch id="status-updates" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleNotificationSave}>
                    <Save className="h-4 w-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and authentication options
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button className="w-full sm:w-auto">
                      <Lock className="h-4 w-4 mr-2" />
                      Update Password
                    </Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account by enabling two-factor authentication.
                  </p>
                  <Button variant="outline">
                    Enable Two-Factor Authentication
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Active Sessions</h3>
                  <div className="space-y-4">
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Current Session</p>
                          <p className="text-sm text-muted-foreground">
                            Chrome on Windows • IP 192.168.1.2
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Active now • Started 2 hours ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                    <div className="border rounded-md p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Mobile Session</p>
                          <p className="text-sm text-muted-foreground">
                            Safari on iOS • IP 192.168.0.5
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Last active 3 days ago
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="text-destructive">
                          Sign Out
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">Sign Out Of All Sessions</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
