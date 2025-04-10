
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, CloudLightning, Database, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock data for snapshot history
const snapshotHistory = [
  { id: 1, timestamp: "2025-04-10T09:30:00", status: "successful", size: "2.4 GB" },
  { id: 2, timestamp: "2025-04-09T14:15:00", status: "successful", size: "2.3 GB" },
  { id: 3, timestamp: "2025-04-08T11:45:00", status: "successful", size: "2.3 GB" },
  { id: 4, timestamp: "2025-04-07T16:20:00", status: "failed", size: "0 GB" },
  { id: 5, timestamp: "2025-04-06T08:10:00", status: "successful", size: "2.2 GB" },
];

export default function Dashboard() {
  const [storageUsed, setStorageUsed] = useState(68);
  
  // Format date in a time-focused way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };
  
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Monitor your system snapshots and time-based changes
          </p>
        </div>
        
        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Snapshots</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +2 since last week
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Instance</CardTitle>
              <CloudLightning className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">EC2-i-87654</div>
              <p className="text-xs text-muted-foreground">
                Running for 14 days
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-1">
                <div className="text-2xl font-bold">{storageUsed}%</div>
                <div className="text-sm text-muted-foreground">34/50 GB</div>
              </div>
              <Progress value={storageUsed} className="h-2" />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Scheduled</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Today</div>
              <p className="text-xs text-muted-foreground">
                23:00 UTC
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Snapshots */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Snapshots</h2>
          <div className="space-y-4">
            {snapshotHistory.map((snapshot) => (
              <Card key={snapshot.id} className="hover:shadow-md transition-all">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    {snapshot.status === "successful" ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    )}
                    <div>
                      <p className="font-medium">Snapshot #{snapshot.id}</p>
                      <p className="text-sm text-muted-foreground">{formatDate(snapshot.timestamp)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{snapshot.size}</span>
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="text-chrono-secondary border-chrono-secondary hover:bg-chrono-secondary hover:text-white"
                    >
                      Restore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col md:flex-row gap-4">
          <Button className="bg-chrono-primary hover:bg-chrono-secondary">
            Create New Snapshot
          </Button>
          <Button variant="outline" className="border-chrono-secondary text-chrono-secondary hover:bg-chrono-secondary hover:text-white">
            Compare Versions
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}
