
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CheckCircle, Clock, CloudLightning, FileText, History, XCircle } from "lucide-react";

// Mock data for timeline events
const timelineEvents = [
  { 
    id: 1, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-10T09:30:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.4 GB" 
  },
  { 
    id: 2, 
    type: "deployment", 
    status: "successful", 
    timestamp: "2025-04-09T18:45:00", 
    message: "Production deployment", 
    details: "Release v2.4.0" 
  },
  { 
    id: 3, 
    type: "config", 
    status: "successful", 
    timestamp: "2025-04-09T16:20:00", 
    message: "Configuration updated", 
    details: "Changed memory allocation" 
  },
  { 
    id: 4, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-09T14:15:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.3 GB" 
  },
  { 
    id: 5, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-08T11:45:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.3 GB" 
  },
  { 
    id: 6, 
    type: "deployment", 
    status: "failed", 
    timestamp: "2025-04-08T10:30:00", 
    message: "Deployment failed", 
    details: "Missing dependencies" 
  },
  { 
    id: 7, 
    type: "snapshot", 
    status: "failed", 
    timestamp: "2025-04-07T16:20:00", 
    message: "Snapshot creation failed", 
    details: "Insufficient permissions" 
  },
  { 
    id: 8, 
    type: "config", 
    status: "successful", 
    timestamp: "2025-04-07T13:10:00", 
    message: "Security group updated", 
    details: "Added new inbound rule" 
  },
  { 
    id: 9, 
    type: "snapshot", 
    status: "successful", 
    timestamp: "2025-04-06T08:10:00", 
    message: "Instance snapshot created", 
    details: "EC2-i-87654 • 2.2 GB" 
  },
];

export default function Timeline() {
  const [filter, setFilter] = useState("all");
  
  // Format date in a time-focused way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      weekday: 'short',
      hour: '2-digit', 
      minute: '2-digit' 
    }).format(date);
  };
  
  // Get icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case "snapshot":
        return <Clock className="h-5 w-5" />;
      case "deployment":
        return <CloudLightning className="h-5 w-5" />;
      case "config":
        return <FileText className="h-5 w-5" />;
      default:
        return <History className="h-5 w-5" />;
    }
  };
  
  // Filter events based on selected tab
  const filteredEvents = filter === "all" 
    ? timelineEvents 
    : timelineEvents.filter(event => event.type === filter);
  
  return (
    <MainLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Timeline</h1>
          <p className="text-muted-foreground">
            View the history of all changes and events
          </p>
        </div>
        
        {/* Filter Tabs */}
        <Tabs defaultValue="all" value={filter} onValueChange={setFilter}>
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="snapshot">Snapshots</TabsTrigger>
              <TabsTrigger value="deployment">Deployments</TabsTrigger>
              <TabsTrigger value="config">Configurations</TabsTrigger>
            </TabsList>
            
            <Button variant="outline" size="sm" className="gap-2">
              <Calendar className="h-4 w-4" />
              <span>Filter by Date</span>
            </Button>
          </div>

          {/* Timeline Content */}
          <TabsContent value={filter} className="mt-6 relative">
            <div className="timeline-connector -z-10"></div>
            
            <div className="space-y-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="relative pl-10 animate-fade-in" style={{ animationDelay: `${event.id * 100}ms` }}>
                  <div className="timeline-dot"></div>
                  
                  <Card className={`border-l-4 ${
                    event.status === "successful" ? "border-l-green-500" : "border-l-red-500"
                  }`}>
                    <CardHeader className="py-3 px-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                          <span className="p-1 rounded-md bg-muted inline-flex">
                            {getEventIcon(event.type)}
                          </span>
                          {event.message}
                          {event.status === "successful" ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </CardTitle>
                        <span className="text-xs text-muted-foreground">
                          {formatDate(event.timestamp)}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-sm text-muted-foreground">{event.details}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
            
            {filteredEvents.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">No {filter} events found</p>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Button variant="outline">Load More</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
