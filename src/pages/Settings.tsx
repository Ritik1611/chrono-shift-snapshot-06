
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

export default function Settings() {
  const [automaticSnapshots, setAutomaticSnapshots] = useState(true);
  const [snapshotFrequency, setSnapshotFrequency] = useState("daily");
  const [storageLimit, setStorageLimit] = useState("50");
  const [retentionPeriod, setRetentionPeriod] = useState("30");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [slackWebhook, setSlackWebhook] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in max-w-3xl mx-auto">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Configure your Chrono instance
          </p>
        </div>

        <Tabs defaultValue="general">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="automation">Automation</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          {/* General Settings */}
          <TabsContent value="general" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Storage Settings</CardTitle>
                <CardDescription>Configure storage limits and retention policies</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="storage-limit">Storage Limit (GB)</Label>
                  <Input
                    id="storage-limit"
                    type="number"
                    value={storageLimit}
                    onChange={(e) => setStorageLimit(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="retention-period">Retention Period (days)</Label>
                  <Input
                    id="retention-period"
                    type="number"
                    value={retentionPeriod}
                    onChange={(e) => setRetentionPeriod(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">
                    Snapshots older than the specified period will be automatically deleted
                  </p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>API Access</CardTitle>
                <CardDescription>Manage your API credentials</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">API Key</h3>
                    <p className="text-sm text-muted-foreground">
                      Used for programmatic access to your Chrono instance
                    </p>
                  </div>
                  <Button variant="outline">Generate New Key</Button>
                </div>
                
                <div className="bg-muted p-3 rounded-md font-mono text-sm overflow-x-auto">
                  chro_k1_7fb4a2c3d5e6f8g9h0i1j2k3l4m5n6o7p8
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Automation Settings */}
          <TabsContent value="automation" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Snapshot Automation</CardTitle>
                <CardDescription>Configure automatic snapshot creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="automatic-snapshots">Automatic Snapshots</Label>
                    <p className="text-sm text-muted-foreground">
                      Create snapshots automatically based on schedule
                    </p>
                  </div>
                  <Switch
                    id="automatic-snapshots"
                    checked={automaticSnapshots}
                    onCheckedChange={setAutomaticSnapshots}
                  />
                </div>
                
                {automaticSnapshots && (
                  <div className="space-y-2">
                    <Label htmlFor="snapshot-frequency">Snapshot Frequency</Label>
                    <Select value={snapshotFrequency} onValueChange={setSnapshotFrequency}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="snapshot-time">Snapshot Time</Label>
                  <Input
                    id="snapshot-time"
                    type="time"
                    defaultValue="23:00"
                    disabled={!automaticSnapshots}
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Pre/Post Snapshot Actions</CardTitle>
                <CardDescription>Configure actions to run before or after snapshots</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pre-snapshot">Pre-Snapshot Command</Label>
                  <Input
                    id="pre-snapshot"
                    placeholder="e.g., /path/to/script.sh"
                  />
                  <p className="text-xs text-muted-foreground">
                    Command to run before taking a snapshot
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="post-snapshot">Post-Snapshot Command</Label>
                  <Input
                    id="post-snapshot"
                    placeholder="e.g., /path/to/notification.sh"
                  />
                  <p className="text-xs text-muted-foreground">
                    Command to run after taking a snapshot
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Settings */}
          <TabsContent value="notifications" className="space-y-6 pt-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure email alerts for important events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-notifications">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive email alerts for snapshot events
                    </p>
                  </div>
                  <Switch
                    id="email-notifications"
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                  />
                </div>
                
                {emailNotifications && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="notification-email">Notification Email</Label>
                      <Input
                        id="notification-email"
                        type="email"
                        defaultValue="john.doe@example.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Notification Events</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-success" defaultChecked />
                          <Label htmlFor="notify-success">Successful Snapshots</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-failure" defaultChecked />
                          <Label htmlFor="notify-failure">Failed Snapshots</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Switch id="notify-storage" defaultChecked />
                          <Label htmlFor="notify-storage">Storage Limit Warnings</Label>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Slack Integration</CardTitle>
                <CardDescription>Send notifications to Slack</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    value={slackWebhook}
                    onChange={(e) => setSlackWebhook(e.target.value)}
                    placeholder="https://hooks.slack.com/services/..."
                  />
                  <p className="text-xs text-muted-foreground">
                    Create a webhook in your Slack workspace to receive notifications
                  </p>
                </div>
                
                <Button variant="outline">Test Notification</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSave} className="bg-chrono-primary hover:bg-chrono-secondary">
            Save Settings
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
